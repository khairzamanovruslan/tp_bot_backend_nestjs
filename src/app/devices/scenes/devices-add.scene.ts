import { DevicesService } from '../devices.sevice';
import { Injectable } from '@nestjs/common';
import {
  Action,
  Ctx,
  Message,
  Next,
  On,
  Scene,
  SceneEnter,
} from 'nestjs-telegraf';
import { Markup } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { Logs } from '../../../features/logs';
import {
  additionalScenesButtons,
  mainEvents,
  mainScenes,
  buttonsTypeObject,
} from '../../../types/types';
import {
  kbBtnCancel,
  dynamicKeyboardInlineTypeObject,
} from '../../../features/keyboards';
import { Context } from '../../../context/context.interface';
import { countOccurrences } from '../utils/checking-string-for-char';
import { CreateDeviceDto } from '../dto/create-device.dto';

const Log = new Logs();

@Injectable()
@Scene(mainScenes.DEVICE_ADD_SCENE)
export class DevicesAddScene {
  constructor(private readonly devicesService: DevicesService) {}
  @SceneEnter()
  async deviceStart(@Ctx() ctxScene: SceneContext, @Ctx() ctx: Context) {
    //Основная логика функции
    ctx.session.device_name_value = '';
    ctx.session.device_latitude_value = '';
    ctx.session.device_longitude_value = '';
    ctx.session.device_type_object_id = null;
    const typeObjectData = await this.devicesService.getAllTypesObject();
    const typeObjectList = typeObjectData.map((i) => i.dataValues);
    const keyboardTypeObject = await dynamicKeyboardInlineTypeObject(
      typeObjectList,
    );
    await ctx.reply(
      `Создание "девайса"!\nВыберите тип объекта:`,
      Markup.inlineKeyboard([...keyboardTypeObject]),
    );
    ctx.session.mainEvent = mainEvents.DEVICE_TYPE_OBJECT;
    return;
  }
  @Action(additionalScenesButtons.btnCancel)
  async deviceCancel(@Ctx() ctxScene: SceneContext, @Ctx() ctx: Context) {
    //Основная логика функции
    await ctxScene.reply(`Отмена!\nДля поиска "девайса" введите имя:`);
    ctx.session.mainEvent = mainEvents.DEVICES_SEARCH;
    ctx.session.device_name_value = '';
    ctx.session.device_latitude_value = '';
    ctx.session.device_longitude_value = '';
    ctx.session.device_type_object_id = null;
    await ctxScene.scene.leave();
    //Логи для разработчика
    const id_tg = String(ctxScene.update['callback_query']['from']['id']);
    await Log.command(ctxScene, id_tg, additionalScenesButtons.btnCancel);
    return;
  }

  @Action(/^typeobjectid+(-[0-9]+)?$/)
  async DynamicKeyboardTypeObjectHandler(
    @Ctx() ctxScene: SceneContext,
    @Ctx() ctx: Context,
  ) {
    //Основная логика функции
    await ctxScene.reply('Введите уникальное имя "девайса":', kbBtnCancel);
    const typeObjectId = Number(ctx['match'][1].split('-')[1]);
    ctx.session.device_type_object_id = typeObjectId;
    ctx.session.mainEvent = mainEvents.DEVICE_NAME;
    //Логи для разработчика
    const id_tg = String(ctxScene.update['callback_query']['from']['id']);
    await Log.command(ctxScene, id_tg, `typeobject-${typeObjectId}`);
    return;
  }

  @On('text')
  async textHandler(
    @Ctx() ctxScene: SceneContext,
    @Ctx() ctx: Context,
    @Next() next: () => ParameterDecorator,
    @Message('text') message: string,
  ) {
    //Логи для разработчика
    const id_tg = String(ctxScene.update['message']['from']['id']);
    await Log.message(ctxScene, id_tg, message);
    //Основная логика функции
    if (message[0] === '/') {
      await ctxScene.reply(
        `Внимание!\nНекорректное имя "девайса"!\nВведите другое имя:`,
        kbBtnCancel,
      );
      return;
    }
    if (ctx.session.mainEvent === mainEvents.DEVICE_NAME) {
      const data = await this.devicesService.getOneByName(message);
      if (data) {
        await ctxScene.reply(
          `Извините, "девайс" с таким именем уже существует.\nПожалуйста попробуйте другое имя:`,
          kbBtnCancel,
        );
        ctx.session.device_name_value = '';
        return;
      }
      ctx.session.device_name_value = message;
      const typeDevice = buttonsTypeObject.filter((item) => {
        return item.id === ctx.session.device_type_object_id;
      })[0];
      await ctx.reply(
        `Отлично!\nТип: ${typeDevice.name}\nИмя: ${message}\nФормат координат: 57.042185,60.504975\n\nТеперь введите координаты:`,
        kbBtnCancel,
      );
      ctx.session.mainEvent = mainEvents.DEVICE_COORDINATES;
      return;
    }

    if (ctx.session.mainEvent === mainEvents.DEVICE_COORDINATES) {
      const messagePrepear = message.replaceAll(' ', '');
      const lengthComma = countOccurrences(messagePrepear, ',');
      if (lengthComma !== 1) {
        await ctx.reply(
          'Ошибка!\nОбратите внимание на запятые, н-р:57.042185,60.504975\nВведите по-новой координаты:',
          kbBtnCancel,
        );
        return;
      }
      const latitude = messagePrepear.split(',')[0];
      const longitude = messagePrepear.split(',')[1];
      const latitudePoint = countOccurrences(latitude, '.');
      const longitudePoint = countOccurrences(longitude, '.');
      if (latitudePoint !== 1 || longitudePoint !== 1) {
        await ctx.reply(
          'Ошибка!\nОбратите внимание на точки, н-р:57.042185,60.504975\nВведите по-новой координаты:',
          kbBtnCancel,
        );
        return;
      }
      const createDeviceData: CreateDeviceDto = {
        name: ctx.session.device_name_value,
        latitude: latitude,
        longitude: longitude,
        type_object_id: ctx.session.device_type_object_id,
      };
      const data = await this.devicesService.createDevice(createDeviceData);
      if (!data) {
        await ctxScene.scene.leave();
        ctx.session.mainEvent = mainEvents.DEVICES_SEARCH;
        ctx.session.device_name_value = '';
        ctx.session.device_latitude_value = '';
        ctx.session.device_longitude_value = '';
        ctx.session.device_type_object_id = null;
        await ctxScene.reply(
          `Извините, "девайс" с таким именем уже существует.\nНачните с начала!`,
        );
        await ctx.reply('Для поиска "девайса" введите имя:');
        return;
      }
      await ctx.reply(`Отлично!\nНовый "девайс" добавлен в базу.`);
      await ctxScene.scene.leave();
      ctx.session.mainEvent = mainEvents.DEVICES_SEARCH;
      ctx.session.device_name_value = '';
      ctx.session.device_latitude_value = '';
      ctx.session.device_longitude_value = '';
      ctx.session.device_type_object_id = null;
      await ctx.reply('Для поиска "девайса" введите имя:');
      return;
    }
    if (ctx.session.mainEvent === mainEvents.DEVICE_TYPE_OBJECT) {
      // получить typeObject из БД
      const typeObjectData = await this.devicesService.getAllTypesObject();
      const typeObjectList = typeObjectData.map((i) => i.dataValues);
      const keyboardTypeObject = await dynamicKeyboardInlineTypeObject(
        typeObjectList,
      );
      await ctx.reply(
        `Дружище, выберити тип объекта:`,
        Markup.inlineKeyboard([...keyboardTypeObject]),
      );
      return;
    }
    ctxScene.scene.leave();
  }
}

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
import { SceneContext } from 'telegraf/typings/scenes';
import { Logs } from '../../../features/logs';
import {
  additionalScenesButtons,
  mainEvents,
  mainScenes,
} from '../../../types/types';
import { kbBtnCancel } from '../../../features/keyboards';
import { Context } from 'src/context/context.interface';
import { countOccurrences } from '../utils/checking-string-for-char';
import { UpdateDeviceDto } from '../dto/update-device.dto';

const Log = new Logs();

@Injectable()
@Scene(mainScenes.DEVICE_UPDATE_SCENE)
export class DevicesUpdateScene {
  constructor(private readonly devicesService: DevicesService) {}
  @SceneEnter()
  async deviceStart(@Ctx() ctxScene: SceneContext, @Ctx() ctx: Context) {
    //Основная логика функции
    ctx.session.mainEvent = mainEvents.DEVICE_NAME;
    ctx.session.device_name_value = '';
    await ctxScene.reply(
      'Для обновления координат "девайса" введите имя:',
      kbBtnCancel,
    );
    return;
  }
  @Action(additionalScenesButtons.btnCancel)
  async deviceCancel(@Ctx() ctxScene: SceneContext, @Ctx() ctx: Context) {
    //Основная логика функции
    await ctxScene.reply(`Отмена!\nДля поиска "девайса" введите имя:`);
    ctx.session.mainEvent = mainEvents.DEVICES_SEARCH;
    ctx.session.device_name_value = '';
    await ctxScene.scene.leave();
    //Логи для разработчика
    const id_tg = String(ctxScene.update['callback_query']['from']['id']);
    await Log.command(ctxScene, id_tg, additionalScenesButtons.btnCancel);
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
        `Внимание!\nНекорректное имя "девайса"!\nВведите другое имя "девайса":`,
        kbBtnCancel,
      );
      return;
    }
    if (ctx.session.mainEvent === mainEvents.DEVICE_NAME) {
      const data = await this.devicesService.getOneByName(message);
      if (!data) {
        await ctxScene.reply(
          `Внимание!\nНе существует "девайса" с таким именем.\nВведите другое имя:`,
          kbBtnCancel,
        );
        ctx.session.device_name_value = '';
        return;
      }
      ctx.session.device_name_value = message;
      await ctx.reply(
        `Отлично!\nИмя: ${message}\nФормат координат: 57.042185,60.504975\n\nТеперь введите координаты:`,
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
          'Ошибка!\nОбратите внимание на запятые, н-р:57.042185,60.504975\nВведите координаты:',
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
          'Ошибка!\nОбратите внимание на точки, н-р:57.042185,60.504975\nВведите координаты:',
          kbBtnCancel,
        );
        return;
      }
      const deviceDto: UpdateDeviceDto = {
        latitude,
        longitude,
      };
      const device = await this.devicesService.updateDevice(
        ctx.session.device_name_value,
        deviceDto,
      );
      if (!device) {
        await ctxScene.scene.leave();
        ctx.session.mainEvent = mainEvents.DEVICES_SEARCH;
        ctx.session.device_name_value = '';
        await ctxScene.reply(
          `Извините, "девайс" с таким именем уже существует.\nНачните с начала!`,
        );
        await ctx.reply('Для поиска "девайса" введите имя:');
        return;
      }
      await ctx.reply(`Отлично!\n"девайс" обновлен.`);
      await ctxScene.scene.leave();
      ctx.session.mainEvent = mainEvents.DEVICES_SEARCH;
      ctx.session.device_name_value = '';
      await ctx.reply('Для поиска "девайса" введите имя:');
      return;
    }
    ctxScene.scene.leave();
  }
}

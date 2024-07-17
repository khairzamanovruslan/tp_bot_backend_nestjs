import { SubstationService } from '../substation.sevice';
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
import { Logs } from '../../features/logs';
import {
  additionalScenesButtons,
  mainEvents,
  mainScenes,
} from '../../types/types';
import { kbBtnCancel } from '../../features/keyboards';
import { Context } from 'src/app/context/context.interface';
import { countOccurrences } from '../utils/checking-string-for-char';

const Log = new Logs();

@Injectable()
@Scene(mainScenes.SUBSTATION_ADD_SCENE)
export class SubstationAddScene {
  constructor(private readonly substationService: SubstationService) {}
  @SceneEnter()
  async substationStart(@Ctx() ctxScene: SceneContext, @Ctx() ctx: Context) {
    //Основная логика функции
    ctx.session.mainEvent = mainEvents.SUBSTATION_ADD_NAME;
    ctx.session.substation_name_value = '';
    await ctxScene.reply('Введите номер ТП:', kbBtnCancel);
    return;
  }
  @Action(additionalScenesButtons.btnCancel)
  async addSubstationCancel(
    @Ctx() ctxScene: SceneContext,
    @Ctx() ctx: Context,
  ) {
    //Основная логика функции
    await ctxScene.reply(`Отмена!\nДля поиска ТП введите номер:`);
    ctx.session.mainEvent = mainEvents.SUBSTATION_SEARCH;
    ctx.session.substation_name_value = '';
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
    const messageLowerCase = message.toLowerCase();
    //Логи для разработчика
    const id_tg = String(ctxScene.update['message']['from']['id']);
    await Log.message(ctxScene, id_tg, messageLowerCase);
    //Основная логика функции
    if (messageLowerCase[0] === '/') {
      await ctxScene.reply(
        `Внимание!\nНекорректный номер ТП!\nВведите другой номер ТП:`,
        kbBtnCancel,
      );
      return;
    }
    if (ctx.session.mainEvent === mainEvents.SUBSTATION_ADD_NAME) {
      const data = await this.substationService.getOneByName(messageLowerCase);
      if (data) {
        await ctxScene.reply(
          `Извините, ТП с таким номером уже существует.\nПожалуйста попробуйте другой номер:`,
          kbBtnCancel,
        );
        ctx.session.substation_name_value = '';
        return;
      }
      ctx.session.substation_name_value = messageLowerCase;
      await ctx.reply(
        `Отлично!\nТП: ${messageLowerCase}\nФормат координат: 57.042185,60.504975\nТеперь введите координаты ТП:`,
        kbBtnCancel,
      );
      ctx.session.mainEvent = mainEvents.SUBSTATION_ADD_COORDINATES;
      return;
    }

    if (ctx.session.mainEvent === mainEvents.SUBSTATION_ADD_COORDINATES) {
      const messagePrepear = messageLowerCase.replaceAll(' ', '');
      const lengthComma = countOccurrences(messagePrepear, ',');
      if (lengthComma !== 1) {
        await ctx.reply(
          'Ошибка!\nОбратите внимание на запятые, н-р:57.042185,60.504975\nВведите координаты ТП:',
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
          'Ошибка!\nОбратите внимание на точки, н-р:57.042185,60.504975\nВведите координаты ТП:',
          kbBtnCancel,
        );
        return;
      }
      const data = await this.substationService.create(
        ctx.session.substation_name_value,
        latitude,
        longitude,
      );
      const dataRes = data.dataValues;
      await ctx.reply(
        `Отлично!\nНовая ТП добавлена в базу.\nНомер: ${dataRes.name}\nКоординаты: ${dataRes.latitude},${dataRes.longitude}`,
      );
      await ctxScene.scene.leave();
      ctx.session.mainEvent = mainEvents.SUBSTATION_SEARCH;
      ctx.session.substation_name_value = '';
      await ctx.reply('Для поиска ТП введите номер:');
      return;
    }
    ctxScene.scene.leave();
  }
}

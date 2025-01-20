import { DevicesService } from '../devices.sevice';
import { Injectable } from '@nestjs/common';
import { Markup } from 'telegraf';
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
import { additionalScenesButtons, mainScenes } from '../../../types/types';
import { dynamicKeyboardInlineDevicesPC } from '../../../features/keyboards';
import { Context } from '../../../context/context.interface';
import {
  linkToYandexMapsAnswer,
  coordinateAnswer,
} from '../../../features/coordinates';

const Log = new Logs();

@Injectable()
@Scene(mainScenes.DEVICES_REPORT_PC_SCENE)
export class DevicesReportPcScene {
  constructor(private readonly devicesService: DevicesService) {}
  @SceneEnter()
  async deviceReportPcStart(
    @Ctx() ctxScene: SceneContext,
    @Ctx() ctx: Context,
  ) {
    //Основная логика функции
    const devicesData = await this.devicesService.getDevicesTypesObjectPC(3); //id=3 - получить ПС
    const listDevicesPC = devicesData.dataValues.devices;
    const listDevicesPrepare = listDevicesPC.map((device) => {
      return { id: device.id, name: device.name };
    });
    const compareFn = (a, b) =>
      a.name.localeCompare(b.name, undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    const listDevicesPCFilter = listDevicesPrepare.sort(compareFn);
    const keyboard = await dynamicKeyboardInlineDevicesPC(listDevicesPCFilter);
    await ctx.reply(`Список ПС:`, Markup.inlineKeyboard([...keyboard]));
    return;
  }

  @Action(additionalScenesButtons.btnCancel)
  async deviceCancel(@Ctx() ctx: SceneContext) {
    //Основная логика функции
    await ctx.reply(`Отмена!\nДля поиска "девайса" введите имя:`);
    await ctx.scene.leave();
    //Логи для разработчика
    const id_tg = String(ctx.update['callback_query']['from']['id']);
    await Log.command(ctx, id_tg, additionalScenesButtons.btnCancel);
  }

  @Action(/^devicepsid+(-[0-9]+)?$/)
  async DynamicKeyboardTypeObjectHandler(
    @Ctx() ctxScene: SceneContext,
    @Ctx() ctx: Context,
  ) {
    //Основная логика функции
    const devicePcId = Number(ctx['match'][1].split('-')[1]);
    const device = await this.devicesService.getOneById(devicePcId);
    const { latitude, longitude, name } = device;
    const link = linkToYandexMapsAnswer(latitude, longitude);
    const coordinate = coordinateAnswer(latitude, longitude);
    await ctx.reply(name);
    await ctx.reply(coordinate);
    await ctx.reply(link);
    ctxScene.scene.leave();
    //Логи для разработчика
    const id_tg = String(ctxScene.update['callback_query']['from']['id']);
    await Log.command(ctxScene, id_tg, `devicePc-${name}`);
    return;
  }

  @On('text')
  async textHandler(
    @Ctx() ctx: SceneContext,
    @Next() next: () => ParameterDecorator,
    @Message('text') message: string,
  ) {
    //Основная логика функции
    await ctx.reply('Для поиска "девайса" введите имя:');
    ctx.scene.leave();
    //Логи для разработчика
    const id_tg = String(ctx.update['message']['from']['id']);
    await Log.message(ctx, id_tg, message);
  }
}

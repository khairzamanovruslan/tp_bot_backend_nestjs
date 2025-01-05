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
import { additionalScenesButtons, mainScenes } from '../../../types/types';
import { kbBtnCancel } from '../../../features/keyboards';

const Log = new Logs();

@Injectable()
@Scene(mainScenes.DEVICE_DELETE_SCENE)
export class DevicesDeleteScene {
  constructor(private readonly devicesService: DevicesService) {}
  @SceneEnter()
  async deviceStart(@Ctx() ctx: SceneContext) {
    //Основная логика функции
    await ctx.reply('Для удаления "девайса" введите имя:', kbBtnCancel);
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

  @On('text')
  async textHandler(
    @Ctx() ctx: SceneContext,
    @Next() next: () => ParameterDecorator,
    @Message('text') message: string,
  ) {
    //Основная логика функции
    if (message[0] === '/') {
      await ctx.reply(
        `Внимание!\nНекорректный номер "девайса"!\nВведите другое имя:`,
        kbBtnCancel,
      );
      return;
    }
    const data = await this.devicesService.deleteDevice(message);
    if (!data) {
      await ctx.reply(
        `Внимание!\nНе существует "девайса" с таким именем.\nВведите другое имя:`,
        kbBtnCancel,
      );
      return;
    }
    await ctx.reply('"девайс" удален!\nДля поиска "девайса" введите имя:');
    ctx.scene.leave();
    //Логи для разработчика
    const id_tg = String(ctx.update['message']['from']['id']);
    await Log.message(ctx, id_tg, message);
  }
}

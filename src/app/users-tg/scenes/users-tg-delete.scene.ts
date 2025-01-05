import { UsersTgService } from '../users-tg.sevice';
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
@Scene(mainScenes.USER_TG_DELETE_SCENE)
export class UsersTgDeleteScene {
  constructor(private readonly userTgService: UsersTgService) {}
  @SceneEnter()
  async userTgStart(@Ctx() ctx: SceneContext) {
    //Основная логика функции
    await ctx.reply('Для удаления пользователя введите его id:', kbBtnCancel);
    return;
  }
  @Action(additionalScenesButtons.btnCancel)
  async userTgCancel(@Ctx() ctx: SceneContext) {
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
        `Внимание!\nid пользователя должен быть числом!\nВведите другой id пользователя:`,
        kbBtnCancel,
      );
      return;
    }
    if (!Boolean(Number(message))) {
      await ctx.reply(
        `Внимание!\nid пользователя должен быть числом!\nВведите другой id пользователя:`,
        kbBtnCancel,
      );
      return;
    }
    /* const userTg = await this.userTgService.getOne(message); */
    const data = await this.userTgService.delete(message);
    if (!data) {
      await ctx.reply(
        `Внимание!\nНе существует пользователя с таким id.\nВведите другой id пользователя:`,
        kbBtnCancel,
      );
      return;
    }
    await ctx.reply('Пользователь удален!\nДля поиска "девайса" введите имя:');
    ctx.scene.leave();
    //Логи для разработчика
    const id_tg = String(ctx.update['message']['from']['id']);
    await Log.message(ctx, id_tg, message);
  }
}

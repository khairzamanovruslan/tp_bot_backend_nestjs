import { UserTgService } from '../user-tg.sevice';
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
import { additionalScenesButtons, mainScenes } from '../../types/types';
import { kbBtnCancel } from '../../features/keyboards';

const Log = new Logs();

@Injectable()
@Scene(mainScenes.USER_TG_ADD_SCENE)
export class UserTgAddScene {
  constructor(private readonly userTgService: UserTgService) {}
  @SceneEnter()
  async userTgStart(@Ctx() ctx: SceneContext) {
    //Основная логика функции
    await ctx.reply(
      'Введите id пользоватателя:\n\nДля этого пользователь должен:\n1. Перейти в бота https://t.me/userinfobot\n2. Нажать кнопку старт\n3. Отправить вам Id',
      kbBtnCancel,
    );
    return;
  }
  @Action(additionalScenesButtons.btnCancel)
  async userTgCancel(@Ctx() ctx: SceneContext) {
    //Основная логика функции
    await ctx.reply(`Отмена!\nДля поиска ТП введите номер:`);
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
    //Логи для разработчика
    const id_tg = String(ctx.update['message']['from']['id']);
    await Log.message(ctx, id_tg, message);
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
    const userTg = await this.userTgService.getOne(message);
    if (userTg) {
      await ctx.reply(
        `Ошибка!\nТакой пользователь уже существует!\nВведите другой id пользователя:`,
        kbBtnCancel,
      );
      return;
    }
    const data = await this.userTgService.create(message);
    if (data) {
      await ctx.reply(
        'Пользователь добавлен!\nТеперь у него есть доступ к боту.',
      );
    }
    ctx.scene.leave();
  }
}

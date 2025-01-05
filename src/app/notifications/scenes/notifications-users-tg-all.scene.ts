import { NotificationsService } from '../notifications.sevice';
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
  mainScenes,
  mainEvents,
} from '../../../types/types';
import { kbBtnCancel } from '../../../features/keyboards';
import { Context } from '../../../context/context.interface';

const Log = new Logs();

@Injectable()
@Scene(mainScenes.NOTIFICATIONS_USERS_TG_ALL_SCENE)
export class NotificationsScene {
  constructor(private readonly notificationService: NotificationsService) {}
  @SceneEnter()
  async start(@Ctx() ctxScene: SceneContext, @Ctx() ctx: Context) {
    //Основная логика функции
    await ctx.reply(
      `Уведомление для всех пользователей телеграм бота!\nВведите текст сообщения:`,
      kbBtnCancel,
    );
    return;
  }
  @Action(additionalScenesButtons.btnCancel)
  async cancel(@Ctx() ctxScene: SceneContext, @Ctx() ctx: Context) {
    //Основная логика функции
    await ctx.reply(`Отмена!\nДля поиска ТП введите номер:`);
    await ctxScene.scene.leave();
    //Логи для разработчика
    const id_tg = String(ctx.update['callback_query']['from']['id']);
    await Log.command(ctx, id_tg, additionalScenesButtons.btnCancel);
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
    const id_tg = String(ctx.update['message']['from']['id']);
    await Log.message(ctx, id_tg, message);
    //Основная логика функции
    if (messageLowerCase[0] === '/') {
      await ctx.reply(
        `Внимание!\nСообщение не должно начинаться со слэша\nВведите другое сообщение:`,
        kbBtnCancel,
      );
      return;
    }
    const usersTg = await this.notificationService.getAllUsersTg();
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    async function broadcastMessage(usersTg, message: string) {
      for (const user of usersTg) {
        try {
          await ctx.telegram.sendMessage(user.id_tg, message);
        } catch (error) {
          if (error.code === 403) {
            console.error(
              `error_code: ${error.code} error_message: ${error.message} Пользователь ${user.id_tg} заблокировал бота.`,
            );
          } else {
            console.error(
              `Не удалось отправить сообщение пользователю ${user.id_tg}:`,
            );
          }
        }
        await delay(0);
      }
    }
    await broadcastMessage(usersTg, message);
    await ctx.reply('Уведомление отправлено всем пользователям телеграм бота!');
    await ctx.reply('Для поиска "девайса" введите имя:');
    ctxScene.scene.leave();
    ctx.session.mainEvent = mainEvents.DEVICES_SEARCH;
    return;
  }
}

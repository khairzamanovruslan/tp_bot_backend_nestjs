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
import { additionalScenesButtons, mainScenes } from '../../types/types';
import { kbBtnCancel } from '../../features/keyboards';

const Log = new Logs();

@Injectable()
@Scene(mainScenes.SUBSTATION_DELETE_SCENE)
export class SubstationDeleteScene {
  constructor(private readonly substationService: SubstationService) {}
  @SceneEnter()
  async substationStart(@Ctx() ctx: SceneContext) {
    //Основная логика функции
    await ctx.reply('Для удаления ТП введите ее номер:', kbBtnCancel);
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
    const messageLowerCase = message.toLowerCase();
    //Основная логика функции
    if (messageLowerCase[0] === '/') {
      await ctx.reply(
        `Внимание!\nНекорректный номер ТП!\nВведите другой номер ТП:`,
        kbBtnCancel,
      );
      return;
    }
    const userTg = await this.substationService.getOneByName(messageLowerCase);
    if (!userTg) {
      await ctx.reply(
        `Внимание!\nНе существует ТП с таким номером.\nВведите другой номер ТП:`,
        kbBtnCancel,
      );
      return;
    }
    const data = await this.substationService.delete(messageLowerCase);
    if (data) {
      await ctx.reply('ТП удалена!\nДля поиска ТП введите номер:');
    }
    ctx.scene.leave();
    //Логи для разработчика
    const id_tg = String(ctx.update['message']['from']['id']);
    await Log.message(ctx, id_tg, messageLowerCase);
  }
}

import { Ctx, InjectBot, Update, Command } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { Context } from '../../context/context.interface';
import { SubstationsService } from './substations.sevice';
import { mainCommands, mainScenes } from '../../types/types';
import { SceneContext } from 'telegraf/typings/scenes';
import { Logs } from '../../features/logs';
import { UsersTgService } from '../users-tg/users-tg.sevice';

const Log = new Logs();

@Update()
export class SubstationsUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly substationsService: SubstationsService,
    private readonly usersTgService: UsersTgService,
  ) {}

  @Command(mainCommands.SUBSTATION_ADD)
  async substationAddScene(@Ctx() ctx: SceneContext) {
    const id_tg = String(ctx.update['message']['from']['id']);
    //Проверка пользователя
    const user = await this.usersTgService.getOneUserTgAndAccess(id_tg);
    if (!user || !user.access.tp_add) {
      await ctx.reply('Вам отказано в доступе!');
      return;
    }
    //Основная логика функции
    await ctx.scene.enter(mainScenes.SUBSTATION_ADD_SCENE);
    //Логи для разработчика
    await Log.command(ctx, id_tg, mainCommands.SUBSTATION_ADD);
    return;
  }
  @Command(mainCommands.SUBSTATION_DELETE)
  async substationDeleteScene(@Ctx() ctx: SceneContext) {
    const id_tg = String(ctx.update['message']['from']['id']);
    //Проверка пользователя
    const user = await this.usersTgService.getOneUserTgAndAccess(id_tg);
    if (!user || !user.access.tp_delete) {
      await ctx.reply('Вам отказано в доступе!');
      return;
    }
    //Основная логика функции
    await ctx.scene.enter(mainScenes.SUBSTATION_DELETE_SCENE);
    //Логи для разработчика
    await Log.command(ctx, id_tg, mainCommands.SUBSTATION_DELETE);
    return;
  }

  @Command(mainCommands.SUBSTATION_UPDATE)
  async substationUpdateScene(@Ctx() ctx: SceneContext) {
    const id_tg = String(ctx.update['message']['from']['id']);
    //Проверка пользователя
    const user = await this.usersTgService.getOneUserTgAndAccess(id_tg);
    if (!user || !user.access.tp_update) {
      await ctx.reply('Вам отказано в доступе!');
      return;
    }
    //Основная логика функции
    await ctx.scene.enter(mainScenes.SUBSTATION_UPDATE_SCENE);
    //Логи для разработчика
    await Log.command(ctx, id_tg, mainCommands.SUBSTATION_UPDATE);
    return;
  }

  @Command(mainCommands.SUBSTATION_REPORT)
  async substationReport(ctx: Context) {
    const id_tg = String(ctx.update['message']['from']['id']);
    //Проверка пользователя
    const user = await this.usersTgService.getOneUserTgAndAccess(id_tg);
    if (!user || !user.access.tp_report) {
      await ctx.reply('Вам отказано в доступе!');
      return;
    }
    //Основная логика функции
    const substations = await this.substationsService.getAll();
    const listItemsName = substations.map((item) => item.name);
    const listItemsNameStr = listItemsName.join(', ');
    await ctx.reply(
      `Отчет_ТП\n\nВсего: ${substations.length} шт. \n\nСписок ТП:\n${listItemsNameStr}`,
    );
    await ctx.reply('Для поиска ТП введите номер:');
    //Логи для разработчика
    await Log.command(ctx, id_tg, mainCommands.SUBSTATION_REPORT);
    return;
  }
}

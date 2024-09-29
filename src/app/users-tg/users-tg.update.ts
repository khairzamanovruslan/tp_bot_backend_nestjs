import { Command, InjectBot, Update, Ctx } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { Context } from '../../context/context.interface';
import { mainCommands, mainScenes } from '../../types/types';
import { UsersTgService } from './users-tg.sevice';
import { Logs } from '../../features/logs';

const Log = new Logs();

@Update()
export class UsersTgUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly usersTgService: UsersTgService,
  ) {}

  @Command(mainCommands.USER_TG_ADD)
  async userTgAddScene(@Ctx() ctx: SceneContext) {
    const id_tg = String(ctx.update['message']['from']['id']);
    //Проверка пользователя
    const user = await this.usersTgService.getOneUserTgAndAccess(id_tg);
    if (!user || !user.access.user_add) {
      await ctx.reply('Вам отказано в доступе!');
      return;
    }
    //Основная логика функции
    await ctx.scene.enter(mainScenes.USER_TG_ADD_SCENE);
    //Логи для разработчика
    await Log.command(ctx, id_tg, mainCommands.USER_TG_ADD);
    return;
  }

  @Command(mainCommands.USER_TG_DELETE)
  async userTgDeleteScene(@Ctx() ctx: SceneContext) {
    const id_tg = String(ctx.update['message']['from']['id']);
    //Проверка пользователя
    const user = await this.usersTgService.getOneUserTgAndAccess(id_tg);
    if (!user || !user.access.user_delete) {
      await ctx.reply('Вам отказано в доступе!');
      return;
    }
    //Основная логика функции
    await ctx.scene.enter(mainScenes.USER_TG_DELETE_SCENE);
    //Логи для разработчика
    await Log.command(ctx, id_tg, mainCommands.USER_TG_DELETE);
    return;
  }

  @Command(mainCommands.USERS_TG_REPORT)
  async usersReport(ctx: Context) {
    const id_tg = String(ctx.update['message']['from']['id']);
    //Проверка пользователя
    const user = await this.usersTgService.getOneUserTgAndAccess(id_tg);
    if (!user || !user.access.users_report) {
      await ctx.reply('Вам отказано в доступе!');
      return;
    }
    //Основная логика функции
    const usersTg = await this.usersTgService.getAllUsersTgAndAccess();
    const listUsers = usersTg.map(
      (item, index) =>
        `№ п.п: ${index + 1}\nid_tg: ${item.id_tg}\nfull_name: ${
          item.full_name || '-'
        }\n\n`,
    );
    const textUsers = listUsers.join('');
    await ctx.reply(
      `Отчет_пользователи\n\nВсего: ${usersTg.length} шт.\n\nСписок:\n${textUsers}`,
    );
    await ctx.reply('Для поиска ТП введите номер:');
    //Логи для разработчика
    await Log.command(ctx, id_tg, mainCommands.USERS_TG_REPORT);
    return;
  }

  @Command(mainCommands.USER_TG_ACCESS)
  async usersAccessReport(ctx: Context) {
    const id_tg = String(ctx.update['message']['from']['id']);
    //Проверка пользователя
    const user = await this.usersTgService.getOneUserTgAndAccess(id_tg);
    if (!user || !user.access.users_access_report) {
      await ctx.reply('Вам отказано в доступе!');
      return;
    }
    //Основная логика функции
    const usersTg = await this.usersTgService.getAllUsersTgAndAccess();
    const listUsers = usersTg.map(
      (item, index) =>
        `№ п.п: ${index + 1}
id_tg: ${item.id_tg}
full_name: ${item.full_name}
tp_search: ${Boolean(item.access.tp_search)}
tp_report: ${Boolean(item.access.tp_report)}
tp_add: ${Boolean(item.access.tp_add)}
tp_delete: ${Boolean(item.access.tp_delete)}
users_report: ${Boolean(item.access.users_report)}
user_add: ${Boolean(item.access.user_add)}
user_delete: ${Boolean(item.access.user_delete)}
users_access_report: ${Boolean(item.access.users_access_report)}
help: ${Boolean(item.access.help)}\n\n`,
    );
    const textUsers = listUsers.join('');
    await ctx.reply(
      `Отчет_пользователи_права доступа\n\nВсего: ${usersTg.length} шт.\n\nСписок:\n${textUsers}`,
    );
    await ctx.reply('Для поиска ТП введите номер:');
    //Логи для разработчика
    await Log.command(ctx, id_tg, mainCommands.USER_TG_ACCESS);
    return;
  }
}

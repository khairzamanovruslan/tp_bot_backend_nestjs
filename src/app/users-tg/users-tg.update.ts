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
      `Список пользователей:\n${textUsers}Всего: ${usersTg.length}`,
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

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    await ctx.reply(
      `Список пользователей (права доступа)\nПроцесс займет около ${usersTg.length} (сек)\nВсего: ${usersTg.length} сотрудника (-ов)`,
    );
    async function handlerUsersAccess(usersTg) {
      let count = 0;
      for (const user of usersTg) {
        const textAccess = `№ п.п: ${count + 1}
id_tg: ${user.id_tg}
full_name: ${user.full_name}
tp_search: ${Boolean(user.access.tp_search)}
tp_report: ${Boolean(user.access.tp_report)}
tp_add: ${Boolean(user.access.tp_add)}
tp_delete: ${Boolean(user.access.tp_delete)}
users_report: ${Boolean(user.access.users_report)}
user_add: ${Boolean(user.access.user_add)}
user_delete: ${Boolean(user.access.user_delete)}
users_access_report: ${Boolean(user.access.users_access_report)}
notifications_users_tg_all: ${Boolean(user.access.notifications_users_tg_all)}
help: ${Boolean(user.access.help)}\n\n`;
        await ctx.reply(textAccess);
        await delay(1000);
        count++;
      }
    }
    await handlerUsersAccess(usersTg);
    await ctx.reply('Для поиска ТП введите номер:');
    //Логи для разработчика
    await Log.command(ctx, id_tg, mainCommands.USER_TG_ACCESS);
    return;
  }
}

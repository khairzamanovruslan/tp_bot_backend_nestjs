import { Ctx, InjectBot, Start, Update, Help } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { AppService } from './app.service';
import { Context } from './context/context.interface';
import { defaultCommands, mainEvents, mainCommands } from './types/types';
import { Logs } from './app/features/logs';
import { UserTgService } from './app/user-tg';

const Log = new Logs();

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService,
    private readonly userTgService: UserTgService,
  ) {}

  @Start()
  async startCommand(@Ctx() ctx: Context) {
    const id_tg = String(ctx.update['message']['from']['id']);
    //Проверка пользователя
    const user = await this.userTgService.getOneAndAccess(id_tg);
    if (!user || !user.access.tp_search) {
      await ctx.reply('Вам отказано в доступе!');
      return;
    }
    //Основная логика функции
    ctx.session.mainEvent = mainEvents.SUBSTATION_SEARCH;
    await ctx.reply('Для поиска ТП введите номер:');
    //Логи для разработчика
    await Log.command(ctx, id_tg, defaultCommands.START);
    return;
  }

  @Help()
  async helpCommand(@Ctx() ctx: Context) {
    const id_tg = String(ctx.update['message']['from']['id']);
    //Проверка пользователя
    const user = await this.userTgService.getOneAndAccess(id_tg);
    if (!user || !user.access.help) {
      await ctx.reply('Вам отказано в доступе!');
      return;
    }
    //Основная логика функции
    const text = `Все команды:\n
/${mainCommands.SUBSTATION_REPORT}
/${mainCommands.SUBSTATION_ADD}
/${mainCommands.SUBSTATION_DELETE}
/${mainCommands.USERS_TG_REPORT}
/${mainCommands.USER_TG_ADD}
/${mainCommands.USER_TG_DELETE}
/${mainCommands.USER_TG_ACCESS}`;
    await ctx.reply(text);
    //Логи для разработчика
    await Log.command(ctx, id_tg, defaultCommands.HELP);
    return;
  }
}

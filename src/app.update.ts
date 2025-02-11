import { Ctx, InjectBot, Start, Update, Help } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { AppService } from './app.service';
import { Context } from './context/context.interface';
import { defaultCommands, mainEvents, mainCommands } from './types/types';
import { Logs } from './features/logs';
import { UsersTgService } from './app/users-tg/users-tg.sevice';

const Log = new Logs();

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService,
    private readonly usersTgService: UsersTgService,
  ) {}

  @Start()
  async startCommand(@Ctx() ctx: Context) {
    const id_tg = String(ctx.update['message']['from']['id']);
    //Проверка пользователя
    const user = await this.usersTgService.getOneUserTgAndAccess(id_tg);
    if (!user || !user.access.devices_search) {
      await ctx.reply('Вам отказано в доступе!');
      return;
    }
    //Основная логика функции
    ctx.session.mainEvent = mainEvents.DEVICES_SEARCH;
    await ctx.reply('Для поиска ТП введите номер:');
    //Логи для разработчика
    await Log.command(ctx, id_tg, defaultCommands.START);
    return;
  }

  @Help()
  async helpCommand(@Ctx() ctx: Context) {
    const id_tg = String(ctx.update['message']['from']['id']);
    //Проверка пользователя
    const user = await this.usersTgService.getOneUserTgAndAccess(id_tg);
    if (!user || !user.access.help) {
      await ctx.reply('Вам отказано в доступе!');
      return;
    }
    //Основная логика функции
    const text = `Все команды:\n
/${mainCommands.DEVICES_REPORT} - список всех "девайсов"
/${mainCommands.DEVICES_REPORT_PC} - список ПС"
/${mainCommands.DEVICE_ADD} - добавить "девайс"
/${mainCommands.DEVICE_UPDATE} - обновить "девайс"
/${mainCommands.DEVICE_DELETE} - удалить "девайс"\n
/${mainCommands.USERS_TG_REPORT} - список пользователей
/${mainCommands.USER_TG_ADD} - добавить пользователя
/${mainCommands.USER_TG_DELETE} - удалить пользователя
/${mainCommands.USER_TG_ACCESS} - список пользователей (с правами)\n
/${mainCommands.NOTIFICATIONS_USERS_TG_ALL} - отправить уведомление всем пользователям\n
/${mainCommands.BACKUP} - бэкап`;
    await ctx.reply(text);
    //Логи для разработчика
    await Log.command(ctx, id_tg, defaultCommands.HELP);
    return;
  }
}

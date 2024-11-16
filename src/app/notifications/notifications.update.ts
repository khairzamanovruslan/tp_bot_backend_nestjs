import { Command, InjectBot, Update, Ctx } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { Context } from '../../context/context.interface';
import { mainCommands, mainScenes } from '../../types/types';
import { Logs } from '../../features/logs';
import { UsersTgService } from '../users-tg/users-tg.sevice';

const Log = new Logs();

@Update()
export class NotificationsUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly usersTgService: UsersTgService,
  ) {}

  @Command(mainCommands.NOTIFICATIONS_USERS_TG_ALL)
  async userTgAddScene(@Ctx() ctx: SceneContext) {
    const id_tg = String(ctx.update['message']['from']['id']);
    //Проверка пользователя
    const user = await this.usersTgService.getOneUserTgAndAccess(id_tg);
    if (!user || !user.access.notifications_users_tg_all) {
      await ctx.reply('Вам отказано в доступе!');
      return;
    }
    //Основная логика функции
    await ctx.scene.enter(mainScenes.NOTIFICATIONS_USERS_TG_ALL_SCENE);
    //Логи для разработчика
    await Log.command(ctx, id_tg, mainCommands.NOTIFICATIONS_USERS_TG_ALL);
    return;
  }
}

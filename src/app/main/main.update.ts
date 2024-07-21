import { Ctx, InjectBot, Update, On, Message } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { Context } from '../../context/context.interface';
import { Logs } from '../features/logs';
import { MainService } from './main.service';
import { SubstationService } from '../substation';
import { mainEvents } from '../../types/types';
import { UserTgService } from '../user-tg';

const Log = new Logs();

@Update()
export class MainUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly mainService: MainService,
    private readonly substationService: SubstationService,
    private readonly userTgService: UserTgService,
  ) {}

  @On('text')
  async textHandler(@Message('text') message: string, @Ctx() ctx: Context) {
    const messageLowerCase = message.toLowerCase();
    //Логи для разработчика
    const id_tg = String(ctx.update['message']['from']['id']);
    await Log.message(ctx, id_tg, messageLowerCase);
    //Проверка пользователя
    const user = await this.userTgService.getOneAndAccess(id_tg);
    if (!user || !user.access.tp_search) {
      await ctx.reply('Вам отказано в доступе!');
      return;
    }
    //Основная логика функции
    if (!ctx.session.mainEvent) return;
    if (ctx.session.mainEvent === mainEvents.SUBSTATION_SEARCH) {
      const substation = await this.substationService.getOneByName(
        messageLowerCase,
      );
      if (!substation) {
        await ctx.reply(`Не найдено!\nДля поиска введите номер ТП:`);
        return;
      }
      const latitude = substation.latitude;
      const longitude = substation.longitude;
      if (!latitude) {
        await ctx.reply('Координата не обнаружена!');
        return;
      }
      const linkForUser = `https://yandex.ru/maps/?pt=${longitude},${latitude}&z=18&l=map`;
      await ctx.reply(`${latitude},${longitude}`);
      await ctx.reply(linkForUser);
      await ctx.reply('Для поиска ТП введите номер:');
      ctx.session.mainEvent = mainEvents.SUBSTATION_SEARCH;
      return;
    }
  }
}

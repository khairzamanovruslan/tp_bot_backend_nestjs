import { Ctx, InjectBot, Update, On, Message } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { Context } from '../../context/context.interface';
import { Logs } from '../../features/logs';
import { MainService } from './main.service';
import { DevicesService } from '../devices/devices.sevice';
import { mainEvents } from '../../types/types';
import { UsersTgService } from '../users-tg/users-tg.sevice';

const Log = new Logs();

@Update()
export class MainUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly mainService: MainService,
    private readonly devicesService: DevicesService,
    private readonly usersTgService: UsersTgService,
  ) {}

  @On('text')
  async textHandler(@Message('text') message: string, @Ctx() ctx: Context) {
    //Логи для разработчика
    const id_tg = String(ctx.update['message']['from']['id']);
    await Log.message(ctx, id_tg, message);
    //Проверка пользователя
    const user = await this.usersTgService.getOneUserTgAndAccess(id_tg);
    if (!user || !user.access.devices_search) {
      await ctx.reply('Вам отказано в доступе!');
      return;
    }
    //Основная логика функции
    if (!ctx.session.mainEvent) return;
    if (ctx.session.mainEvent === mainEvents.DEVICES_SEARCH) {
      const substation = await this.devicesService.getOneByName(message);
      if (!substation) {
        await ctx.reply(`Не найдено!\nДля поиска "девайса" введите имя:`);
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
      await ctx.reply('Для поиска "девайса" введите имя:');
      ctx.session.mainEvent = mainEvents.DEVICES_SEARCH;
      return;
    }
  }
}

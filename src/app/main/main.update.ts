import { Ctx, InjectBot, Update, On, Message } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { Context } from '../../context/context.interface';
import { Logs } from '../../features/logs';
import { MainService } from './main.service';
import { DevicesService } from '../devices/devices.sevice';
import { mainEvents } from '../../types/types';
import { UsersTgService } from '../users-tg/users-tg.sevice';
import {
  linkToYandexMapsAnswer,
  coordinateAnswer,
} from '../../features/coordinates';

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
      const device = await this.devicesService.getOneByName(message);
      if (!device) {
        await ctx.reply(`Не найдено!\nДля поиска "девайса" введите имя:`);
        return;
      }
      const latitude = device.latitude;
      const longitude = device.longitude;
      if (!latitude) {
        await ctx.reply('Координата не обнаружена!');
        return;
      }
      const link = linkToYandexMapsAnswer(latitude, longitude);
      const coordinate = coordinateAnswer(latitude, longitude);
      await ctx.reply(coordinate);
      await ctx.reply(link);
      await ctx.reply('Для поиска "девайса" введите имя:');
      ctx.session.mainEvent = mainEvents.DEVICES_SEARCH;
      return;
    }
  }
}

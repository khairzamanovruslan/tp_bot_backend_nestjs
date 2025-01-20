import { Ctx, InjectBot, Update, Command } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { Context } from '../../context/context.interface';
import { DevicesService } from './devices.sevice';
import { mainCommands, mainScenes } from '../../types/types';
import { SceneContext } from 'telegraf/typings/scenes';
import { Logs } from '../../features/logs';
import { UsersTgService } from '../users-tg/users-tg.sevice';

const Log = new Logs();

@Update()
export class DevicesUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly devicesService: DevicesService,
    private readonly usersTgService: UsersTgService,
  ) {}

  @Command(mainCommands.DEVICE_ADD)
  async deviceAddScene(@Ctx() ctx: SceneContext) {
    const id_tg = String(ctx.update['message']['from']['id']);
    //Проверка пользователя
    const user = await this.usersTgService.getOneUserTgAndAccess(id_tg);
    if (!user || !user.access.device_add) {
      await ctx.reply('Вам отказано в доступе!');
      return;
    }
    //Основная логика функции
    await ctx.scene.enter(mainScenes.DEVICE_ADD_SCENE);
    //Логи для разработчика
    await Log.command(ctx, id_tg, mainCommands.DEVICE_ADD);
    return;
  }
  @Command(mainCommands.DEVICE_DELETE)
  async deviceDeleteScene(@Ctx() ctx: SceneContext) {
    const id_tg = String(ctx.update['message']['from']['id']);
    //Проверка пользователя
    const user = await this.usersTgService.getOneUserTgAndAccess(id_tg);
    if (!user || !user.access.device_delete) {
      await ctx.reply('Вам отказано в доступе!');
      return;
    }
    //Основная логика функции
    await ctx.scene.enter(mainScenes.DEVICE_DELETE_SCENE);
    //Логи для разработчика
    await Log.command(ctx, id_tg, mainCommands.DEVICE_DELETE);
    return;
  }

  @Command(mainCommands.DEVICE_UPDATE)
  async deviceUpdateScene(@Ctx() ctx: SceneContext) {
    const id_tg = String(ctx.update['message']['from']['id']);
    //Проверка пользователя
    const user = await this.usersTgService.getOneUserTgAndAccess(id_tg);
    if (!user || !user.access.device_update) {
      await ctx.reply('Вам отказано в доступе!');
      return;
    }
    //Основная логика функции
    await ctx.scene.enter(mainScenes.DEVICE_UPDATE_SCENE);
    //Логи для разработчика
    await Log.command(ctx, id_tg, mainCommands.DEVICE_UPDATE);
    return;
  }

  @Command(mainCommands.DEVICES_REPORT)
  async devicesReport(ctx: Context) {
    const id_tg = String(ctx.update['message']['from']['id']);
    //Проверка пользователя
    const user = await this.usersTgService.getOneUserTgAndAccess(id_tg);
    if (!user || !user.access.devices_report) {
      await ctx.reply('Вам отказано в доступе!');
      return;
    }
    //Основная логика функции
    const devicesList =
      await this.devicesService.getAllTypesObjectWithDevices();
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    async function handlerDevices(data) {
      for (const item of data) {
        const listDevicesData = item.dataValues.devices;
        const listDevices = listDevicesData.map((i) => i.name);
        const compareFn = (a, b) =>
          a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
        const listDevicesFilter = listDevices.sort(compareFn);
        const prepearListDevice =
          listDevicesFilter.length !== 0
            ? `\n${listDevicesFilter.join(', ')}`
            : '';
        const res = `Список ${item.name}: ${prepearListDevice}\n\nВсего: ${item.dataValues.devices.length}\n\n`;
        await ctx.reply(res);
        await delay(0);
      }
    }
    await handlerDevices(devicesList);

    await ctx.reply('Для поиска "девайса" введите имя:');
    //Логи для разработчика
    await Log.command(ctx, id_tg, mainCommands.DEVICES_REPORT);
    return;
  }

  @Command(mainCommands.DEVICES_REPORT_PC)
  async devicesReportPC(@Ctx() ctx: SceneContext) {
    const id_tg = String(ctx.update['message']['from']['id']);
    //Проверка пользователя
    const user = await this.usersTgService.getOneUserTgAndAccess(id_tg);
    if (!user || !user.access.devices_report_pc) {
      await ctx.reply('Вам отказано в доступе!');
      return;
    }
    //Основная логика функции
    await ctx.scene.enter(mainScenes.DEVICES_REPORT_PC_SCENE);
    //Логи для разработчика
    await Log.command(ctx, id_tg, mainCommands.DEVICES_REPORT_PC);
    return;
  }
}

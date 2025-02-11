import { Command, InjectBot, Update, Ctx } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import * as Excel from 'exceljs';
import { Context } from '../../context/context.interface';
import { mainCommands } from '../../types/types';
import { BackupService } from './backup.service';
import { Logs } from '../../features/logs';
import { UsersTgService } from '../users-tg/users-tg.sevice';
import * as path from 'path';

const Log = new Logs();

@Update()
export class BackupUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly backupService: BackupService,
    private readonly usersTgService: UsersTgService,
  ) {}

  @Command(mainCommands.BACKUP)
  async backupHandler(@Ctx() ctx: Context) {
    const id_tg = String(ctx.update['message']['from']['id']);
    //Проверка пользователя
    const user = await this.usersTgService.getOneUserTgAndAccess(id_tg);
    if (!user || !user.access.backup) {
      await ctx.reply('Вам отказано в доступе!');
      return;
    }
    //Основная логика функции
    await ctx.reply('Файл формируется, ожидайте...');
    const workbook = new Excel.Workbook();
    const handler = async (data, nameWorksheet: string) => {
      const worksheet = workbook.addWorksheet(nameWorksheet);
      if (data.length <= 0) {
        return false;
      }
      const keys = Object.keys(data[0].dataValues);
      const keysColumns = keys.map((item) => {
        return { header: item, key: item };
      });
      worksheet.columns = [...keysColumns];
      data.forEach((item) => worksheet.addRow(item.dataValues));
      return;
    };
    const devices = await this.backupService.getAllDevices();
    await handler(devices, 'devices');
    const typeObject = await this.backupService.getAllDevicesTypeObject();
    await handler(typeObject, 'devices_type_object');
    const usersTg = await this.backupService.getAllUsersTg();
    await handler(usersTg, 'users_tg');
    const usersTgAccess = await this.backupService.getAllUsersTgAccess();
    await handler(usersTgAccess, 'users_tg_access');
    const date = new Date().toLocaleDateString();
    const fileName = `${date}_${devices.length}_${usersTg.length}.xlsx`;
    const pathShare = path.resolve(process.env.SHARE, fileName);
    await workbook.xlsx.writeFile(pathShare);
    await ctx.replyWithDocument({ source: pathShare, filename: fileName });
    //Логи для разработчика
    await Log.command(ctx, id_tg, mainCommands.BACKUP);
    return;
  }
}

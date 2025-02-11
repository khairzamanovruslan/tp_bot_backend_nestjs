import { Module } from '@nestjs/common';
import { BackupService } from './backup.service';
import { BackupController } from './backup.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersTg } from '../users-tg/models/users-tg.model';
import { UsersTgAccess } from '../users-tg/models/users-tg-access.model';
import { Devices } from '../devices/models/devices.model';
import { DeviceTypeObject } from '../devices/models/devices-type-object.model';
import { BackupUpdate } from './backup.update';
import { UsersTgModule } from '../users-tg/users-tg.module';

@Module({
  imports: [
    UsersTgModule,
    SequelizeModule.forFeature([
      UsersTg,
      UsersTgAccess,
      Devices,
      DeviceTypeObject,
    ]),
  ],
  controllers: [BackupController],
  providers: [BackupUpdate, BackupService],
  exports: [BackupService],
})
export class BackupModule {}

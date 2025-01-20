import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.sevice';
import { DevicesUpdate } from './devices.update';
import { Devices } from './models/devices.model';
import { DevicesDeleteScene } from './scenes/devices-delete.scene';
import { DevicesAddScene } from './scenes/devices-add.scene';
import { UsersTgModule } from '../users-tg/users-tg.module';
import { DevicesUpdateScene } from './scenes/devices-update.scene';
import { DeviceTypeObject } from './models/devices-type-object.model';
import { DevicesReportPcScene } from './scenes/devices-report-pc.scene';

@Module({
  imports: [
    UsersTgModule,
    SequelizeModule.forFeature([Devices, DeviceTypeObject]),
  ],
  controllers: [DevicesController],
  providers: [
    DevicesUpdate,
    DevicesService,
    DevicesAddScene,
    DevicesDeleteScene,
    DevicesUpdateScene,
    DevicesReportPcScene,
  ],
  exports: [DevicesService],
})
export class DevicesModule {}

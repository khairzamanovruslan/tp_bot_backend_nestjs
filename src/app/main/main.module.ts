import { Module } from '@nestjs/common';
import { MainController } from './main.controller';
import { MainUpdate } from './main.update';
import { MainService } from './main.service';
import { DevicesModule } from '../devices/devices.module';
import { UsersTgModule } from '../users-tg/users-tg.module';

@Module({
  imports: [UsersTgModule, DevicesModule],
  controllers: [MainController],
  providers: [MainUpdate, MainService],
})
export class MainModule {}

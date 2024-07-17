import { Module } from '@nestjs/common';
import { MainController } from './main.controller';
import { MainUpdate } from './main.update';
import { MainService } from './main.service';
import { SubstationService } from '../substation/substation.sevice';
import { SequelizeModule } from '@nestjs/sequelize';
import { Substation } from '../substation';
import { UserTg, UserTgService, UserTgAccess } from '../user-tg';

@Module({
  imports: [SequelizeModule.forFeature([Substation, UserTg, UserTgAccess])],
  controllers: [MainController],
  providers: [MainUpdate, MainService, SubstationService, UserTgService],
})
export class MainModule {}

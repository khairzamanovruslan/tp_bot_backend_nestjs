import { Module } from '@nestjs/common';
import { MainController } from './main.controller';
import { MainUpdate } from './main.update';
import { MainService } from './main.service';
import { SubstationModule } from '../substation';
import { UserTgModule } from '../user-tg';

@Module({
  imports: [UserTgModule, SubstationModule],
  controllers: [MainController],
  providers: [MainUpdate, MainService],
})
export class MainModule {}

import { Module } from '@nestjs/common';
import { MainController } from './main.controller';
import { MainUpdate } from './main.update';
import { MainService } from './main.service';
import { SubstationsModule } from '../substations/substations.module';
import { UsersTgModule } from '../users-tg/users-tg.module';

@Module({
  imports: [UsersTgModule, SubstationsModule],
  controllers: [MainController],
  providers: [MainUpdate, MainService],
})
export class MainModule {}

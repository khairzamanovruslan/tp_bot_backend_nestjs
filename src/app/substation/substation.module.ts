import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubstationController } from './substation.controller';
import { SubstationService } from './substation.sevice';
import { SubstationUpdate } from './substation.update';
import { Substation } from './substation.model';
import { SubstationDeleteScene } from './scenes/substation-delete.scene';
import { SubstationAddScene } from './scenes/substation-add.scene';
import { UserTgModule } from '../user-tg';

@Module({
  imports: [UserTgModule, SequelizeModule.forFeature([Substation])],
  controllers: [SubstationController],
  providers: [
    SubstationUpdate,
    SubstationService,
    SubstationAddScene,
    SubstationDeleteScene,
  ],
  exports: [SubstationService],
})
export class SubstationModule {}

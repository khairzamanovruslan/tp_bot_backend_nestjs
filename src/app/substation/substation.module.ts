import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubstationController } from './substation.controller';
import { SubstationService } from './substation.sevice';
import { SubstationUpdate } from './substation.update';
import { Substation } from './substation.model';
import { SubstationDeleteScene } from './scenes/substation-delete.scene';
import { SubstationAddScene } from './scenes/substation-add.scene';
import { UserTg, UserTgService, UserTgAccess } from '../user-tg';

@Module({
  imports: [SequelizeModule.forFeature([Substation, UserTg, UserTgAccess])],
  controllers: [SubstationController],
  providers: [
    SubstationUpdate,
    SubstationService,
    SubstationAddScene,
    SubstationDeleteScene,
    UserTgService,
  ],
})
export class SubstationModule {}

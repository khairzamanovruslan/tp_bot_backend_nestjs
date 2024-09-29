import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubstationsController } from './substations.controller';
import { SubstationsService } from './substations.sevice';
import { SubstationsUpdate } from './substations.update';
import { Substations } from './substations.model';
import { SubstationsDeleteScene } from './scenes/substations-delete.scene';
import { SubstationsAddScene } from './scenes/substations-add.scene';
import { UsersTgModule } from '../users-tg/users-tg.module';
import { SubstationsUpdateScene } from './scenes/substations-update.scene';

@Module({
  imports: [UsersTgModule, SequelizeModule.forFeature([Substations])],
  controllers: [SubstationsController],
  providers: [
    SubstationsUpdate,
    SubstationsService,
    SubstationsAddScene,
    SubstationsDeleteScene,
    SubstationsUpdateScene,
  ],
  exports: [SubstationsService],
})
export class SubstationsModule {}

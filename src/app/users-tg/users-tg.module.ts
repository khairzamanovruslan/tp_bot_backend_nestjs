import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersTgController } from './users-tg.controller';
import { UsersTgService } from './users-tg.sevice';
import { UsersTgUpdate } from './users-tg.update';
import { UsersTg } from './models/users-tg.model';
import { UsersTgAccess } from './models/users-tg-access.model';
import { UsersTgAddScene } from './scenes/users-tg-add.scene';
import { UsersTgDeleteScene } from './scenes/users-tg-delete.scene';

@Module({
  imports: [SequelizeModule.forFeature([UsersTg, UsersTgAccess])],
  controllers: [UsersTgController],
  providers: [
    UsersTgUpdate,
    UsersTgService,
    UsersTgAddScene,
    UsersTgDeleteScene,
  ],
  exports: [UsersTgService],
})
export class UsersTgModule {}

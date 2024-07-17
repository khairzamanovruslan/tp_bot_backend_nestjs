import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserTgController } from './user-tg.controller';
import { UserTgService } from './user-tg.sevice';
import { UserTgUpdate } from './user-tg.update';
import { UserTg } from './models/user-tg.model';
import { UserTgAccess } from './models/user-tg-access.model';
import { UserTgAddScene } from './scenes/user-tg-add.scene';
import { UserTgDeleteScene } from './scenes/user-tg-delete.scene';

@Module({
  imports: [SequelizeModule.forFeature([UserTg, UserTgAccess])],
  controllers: [UserTgController],
  providers: [UserTgUpdate, UserTgService, UserTgAddScene, UserTgDeleteScene],
})
export class UserTgModule {}

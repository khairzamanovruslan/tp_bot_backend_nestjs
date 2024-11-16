import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.sevice';
import { NotificationsUpdate } from './notifications.update';
import { UsersTg } from '../users-tg/models/users-tg.model';
import { NotificationsScene } from './scenes/notifications-users-tg-all.scene';
import { UsersTgModule } from '../users-tg/users-tg.module';

@Module({
  imports: [SequelizeModule.forFeature([UsersTg]), UsersTgModule],
  controllers: [NotificationsController],
  providers: [NotificationsUpdate, NotificationsService, NotificationsScene],
  exports: [NotificationsService],
})
export class NotificationsModule {}

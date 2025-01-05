import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationsService } from './notifications.sevice';

@ApiTags('Уведомления')
@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsTgService: NotificationsService) {}

  @Get()
  get() {
    return 'Уведомление';
  }
}

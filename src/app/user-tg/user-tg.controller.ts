import { Controller, Get } from '@nestjs/common';
import { UserTgService } from './user-tg.sevice';

@Controller('user-tg')
export class UserTgController {
  constructor(private userTgService: UserTgService) {}

  @Get('/all')
  getUsersAll() {
    return this.userTgService.getAll();
  }
}

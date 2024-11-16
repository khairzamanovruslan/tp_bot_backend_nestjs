import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersTg } from '../users-tg/models/users-tg.model';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(UsersTg) private usersTgRepository: typeof UsersTg,
  ) {}

  async getAllUsersTg() {
    return this.usersTgRepository.findAll({
      order: [['id', 'ASC']],
    });
  }
}

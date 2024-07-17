import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { UserTgAccess } from './models/user-tg-access.model';
import { UserTg } from './models/user-tg.model';

@Injectable()
export class UserTgService {
  constructor(
    @InjectModel(UserTg) private userTgRepository: typeof UserTg,
    @InjectModel(UserTgAccess)
    private userTgAccessRepository: typeof UserTgAccess,
  ) {}

  async getAll() {
    return this.userTgRepository.findAndCountAll({
      order: [['id', 'ASC']],
      include: UserTgAccess,
    });
  }
  async getOne(id_tg: string) {
    return this.userTgRepository.findOne({
      where: { id_tg: { [Op.eq]: id_tg } },
    });
  }
  async getOneAndAccess(id_tg: string) {
    return this.userTgRepository.findOne({
      where: { id_tg: { [Op.eq]: id_tg } },
      include: UserTgAccess,
    });
  }
  async create(id_tg: string) {
    const userTg = await this.userTgRepository.create({
      id_tg,
      access_bot: true,
    });
    await this.userTgAccessRepository.create({
      user_tg_id: userTg.id,
    });
    return userTg;
  }
  async delete(id_tg: string) {
    return this.userTgRepository.destroy({
      where: {
        id_tg: {
          [Op.eq]: id_tg,
        },
      },
    });
  }
}

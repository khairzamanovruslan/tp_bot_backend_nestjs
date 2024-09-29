import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { UsersTgAccess } from './models/users-tg-access.model';
import { UsersTg } from './models/users-tg.model';
import { CreateUserTgDto } from './dto/create-user-tg.dto';

@Injectable()
export class UsersTgService {
  constructor(
    @InjectModel(UsersTg) private usersTgRepository: typeof UsersTg,
    @InjectModel(UsersTgAccess)
    private usersTgAccessRepository: typeof UsersTgAccess,
  ) {}

  async getAllUsersTg() {
    return this.usersTgRepository.findAll({
      order: [['id', 'ASC']],
    });
  }
  async getAllUsersTgAndAccess() {
    return this.usersTgRepository.findAll({
      order: [['id', 'ASC']],
      include: UsersTgAccess,
    });
  }
  async getOne(id_tg: string) {
    return this.usersTgRepository.findOne({
      where: { id_tg: { [Op.eq]: id_tg } },
    });
  }
  async getOneUserTgAndAccess(id_tg: string) {
    return this.usersTgRepository.findOne({
      where: { id_tg: { [Op.eq]: id_tg } },
      include: UsersTgAccess,
    });
  }
  async createUserTgFromTelegramBot(id_tg: string) {
    const userTgData = await this.getOne(id_tg);
    if (userTgData) {
      return false;
    }
    const userTg = await this.usersTgRepository.create({ id_tg });
    await this.usersTgAccessRepository.create({
      user_tg_id: userTg.id,
    });
    return userTg;
  }
  async createUserTgFromWeb(userTgDto: CreateUserTgDto) {
    if (
      Boolean(userTgDto.id_tg) === false ||
      userTgDto.id_tg[0] === '/' ||
      !Boolean(Number(userTgDto.id_tg))
    ) {
      return false;
    }
    const userTgData = await this.getOne(userTgDto.id_tg);
    if (userTgData) {
      return false;
    }
    const userTg = await this.usersTgRepository.create(userTgDto);
    await this.usersTgAccessRepository.create({
      user_tg_id: userTg.id,
    });
    return userTg;
  }
  async delete(id_tg: string) {
    const userTgData = await this.getOne(id_tg);
    if (!userTgData) {
      return false;
    }
    const data = await this.usersTgRepository.destroy({
      where: {
        id_tg: {
          [Op.eq]: id_tg,
        },
      },
    });
    return Boolean(data);
  }
}

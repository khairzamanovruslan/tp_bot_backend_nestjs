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
  async createUserTg(id_tg: string) {
    const userTgData = await this.getOne(id_tg);
    if (userTgData) {
      return false;
    }
    const lastPKUsersTg = await this.getLastPrimaryKeyUsersTg();
    const userTg = await this.usersTgRepository.create({
      id: lastPKUsersTg + 1,
      id_tg: id_tg,
    });
    const lastPKUsersTgAccess = await this.getLastPrimaryKeyUsersTgAccess();
    await this.usersTgAccessRepository.create({
      id: lastPKUsersTgAccess + 1,
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
  async getLastPrimaryKeyUsersTg() {
    const data = await this.usersTgRepository.findAll({
      order: [['id', 'DESC']],
      limit: 1,
    });
    if (data.length === 0) {
      return 0;
    }
    const id = data[0].dataValues.id;
    return id;
  }
  async getLastPrimaryKeyUsersTgAccess() {
    const data = await this.usersTgAccessRepository.findAll({
      order: [['id', 'DESC']],
      limit: 1,
    });
    if (data.length === 0) {
      return 0;
    }
    const id = data[0].dataValues.id;
    return id;
  }
}

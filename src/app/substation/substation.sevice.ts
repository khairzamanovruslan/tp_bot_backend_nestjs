import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Substation } from './substation.model';

@Injectable()
export class SubstationService {
  constructor(
    @InjectModel(Substation) private substationRepository: typeof Substation,
  ) {}

  async getAll() {
    return this.substationRepository.findAndCountAll({
      order: [['name', 'ASC']],
    });
  }
  async getOneByName(name: string) {
    return this.substationRepository.findOne({
      where: { name: { [Op.eq]: name } },
    });
  }
  async create(name: string, latitude: string, longitude: string) {
    return this.substationRepository.create({ name, latitude, longitude });
  }
  async delete(name: string) {
    return this.substationRepository.destroy({
      where: {
        name: {
          [Op.eq]: name,
        },
      },
    });
  }
}

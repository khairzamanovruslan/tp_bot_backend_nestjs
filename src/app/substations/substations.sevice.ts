import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Substations } from './substations.model';
import { CreateSubstationDto } from './dto/create-substation.dto';
import { UpdateSubstationDto } from './dto/update-substation.dto';

@Injectable()
export class SubstationsService {
  constructor(
    @InjectModel(Substations) private substationsRepository: typeof Substations,
  ) {}

  async getAll() {
    const substations = await this.substationsRepository.findAll({
      order: [['name', 'ASC']],
    });
    return substations;
  }

  async getOneByName(name: string) {
    const substation = await this.substationsRepository.findOne({
      where: { name: { [Op.eq]: name } },
    });
    return substation;
  }
  async getLastPrimaryKeyTp() {
    const data = await this.substationsRepository.findAll({
      order: [['id', 'DESC']],
      limit: 1,
    });
    const id = data[0].dataValues.id;
    return id;
  }

  async createTp(dto: CreateSubstationDto) {
    const substation = await this.getOneByName(dto.name);
    if (substation) {
      return false;
    }
    const lastPrimaryKeyTp = await this.getLastPrimaryKeyTp();
    const data = await this.substationsRepository.create({
      id: lastPrimaryKeyTp + 1,
      name: dto.name,
      latitude: dto.latitude,
      longitude: dto.longitude,
    });
    return data;
  }

  async delete(name: string) {
    const substation = await this.getOneByName(name);
    if (!substation) {
      return false;
    }
    const data = await this.substationsRepository.destroy({
      where: {
        name: {
          [Op.eq]: name,
        },
      },
    });
    return Boolean(data);
  }

  async update(name: string, substationDto: UpdateSubstationDto) {
    const substation = await this.getOneByName(name);
    if (!substation) {
      return false;
    }
    const data = await this.substationsRepository.update(
      { ...substationDto },
      {
        where: {
          name: {
            [Op.eq]: name,
          },
        },
      },
    );
    return Boolean(data);
  }
}

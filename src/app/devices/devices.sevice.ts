import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Devices } from './models/devices.model';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeviceTypeObject } from './models/devices-type-object.model';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Devices) private devicesRepository: typeof Devices,
    @InjectModel(DeviceTypeObject)
    private deviceTypeObjectRepository: typeof DeviceTypeObject,
  ) {}

  async getAll() {
    const devices = await this.devicesRepository.findAll({
      order: [['name', 'ASC']],
    });
    return devices;
  }

  async getOneByName(name: string) {
    const device = await this.devicesRepository.findOne({
      where: { name: { [Op.iLike]: name } },
    });
    return device;
  }
  async getLastPrimaryKeyTp() {
    const data = await this.devicesRepository.findAll({
      order: [['id', 'DESC']],
      limit: 1,
    });
    if (data.length === 0) {
      return 0;
    }
    const id = data[0].dataValues.id;
    return id;
  }

  async createDevice(dto: CreateDeviceDto) {
    const device = await this.getOneByName(dto.name);
    if (device) {
      return false;
    }
    const lastPrimaryKeyTp = await this.getLastPrimaryKeyTp();
    const data = await this.devicesRepository.create({
      id: lastPrimaryKeyTp + 1,
      name: dto.name,
      latitude: dto.latitude,
      longitude: dto.longitude,
      type_object_id: dto.type_object_id,
    });
    return data;
  }

  async deleteDevice(name: string) {
    const device = await this.getOneByName(name);
    if (!device) {
      return false;
    }
    const data = await this.devicesRepository.destroy({
      where: {
        name: {
          [Op.iLike]: name,
        },
      },
    });
    return Boolean(data);
  }

  async updateDevice(name: string, deviceDto: UpdateDeviceDto) {
    const device = await this.getOneByName(name);
    if (!device) {
      return false;
    }
    const data = await this.devicesRepository.update(
      { ...deviceDto },
      {
        where: {
          name: {
            [Op.iLike]: name,
          },
        },
      },
    );
    return Boolean(data);
  }

  async getAllTypesObjectWithDevices() {
    const typeObject = await this.deviceTypeObjectRepository.findAll({
      order: [['name', 'DESC']],
      include: Devices,
    });
    return typeObject;
  }
}

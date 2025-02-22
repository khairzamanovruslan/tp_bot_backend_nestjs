import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersTg } from '../users-tg/models/users-tg.model';
import { UsersTgAccess } from '../users-tg/models/users-tg-access.model';
import { Devices } from '../devices/models/devices.model';
import { DeviceTypeObject } from '../devices/models/devices-type-object.model';

@Injectable()
export class BackupService {
  constructor(
    @InjectModel(UsersTg) private usersTgRepository: typeof UsersTg,
    @InjectModel(UsersTgAccess)
    private usersTgAccessRepository: typeof UsersTgAccess,
    @InjectModel(Devices) private devicesRepository: typeof Devices,
    @InjectModel(DeviceTypeObject)
    private deviceTypeObject: typeof DeviceTypeObject,
  ) {}
  async getAllUsersTg() {
    const usersTg = await this.usersTgRepository.findAll({
      order: [['id', 'ASC']],
    });
    return usersTg;
  }
  async getAllUsersTgAccess() {
    const usersTgAccess = await this.usersTgAccessRepository.findAll({
      order: [['id', 'ASC']],
    });
    return usersTgAccess;
  }
  async getAllDevices() {
    const devices = await this.devicesRepository.findAll({
      order: [['id', 'ASC']],
    });
    return devices;
  }
  async getAllDevicesTypeObject() {
    const devicesTypeObject = await this.deviceTypeObject.findAll({
      order: [['id', 'ASC']],
    });
    return devicesTypeObject;
  }
}

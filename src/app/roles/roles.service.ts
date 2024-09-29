import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/roles.model';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private rolesRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto) {
    //если в dto ничего не передать то сервер падает
    const role = await this.rolesRepository.create(dto);
    return role;
  }

  async getRoleByValue(value: string) {
    const role = await this.rolesRepository.findOne({ where: { value } });
    return role;
  }
  async getAllRoles() {
    const roles = await this.rolesRepository.findAll();
    return roles;
  }
}

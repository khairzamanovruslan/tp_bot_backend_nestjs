import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private usersRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async getAll() {
    return this.usersRepository.findAll({
      order: [['id', 'ASC']],
      include: { all: true },
    });
  }

  async createUser(dto: CreateUserDto) {
    if (!Boolean(dto.email) || !Boolean(dto.password)) {
      return false;
    }
    const user = await this.usersRepository.create(dto);
    const role = await this.rolesService.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }
}

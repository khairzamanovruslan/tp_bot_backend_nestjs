import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { Role } from '../roles/models/roles.model';
import { UserRoles } from '../roles/models/user-roles.model';
import { RolesModule } from '../roles/roles.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, Role, UserRoles]), RolesModule],
  exports: [UsersService],
})
export class UsersModule {}

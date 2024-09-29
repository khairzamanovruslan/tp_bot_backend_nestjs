import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/users.model';
import { UserRoles } from './user-roles.model';

interface RoleCreationAttrs {
  value: string;
  description: string;
  access: boolean;
}

@Table({ tableName: 'roles', timestamps: false })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Уникальное значение роли пользователя',
  })
  @Column({ type: DataType.TEXT, unique: true, allowNull: false })
  value: string;

  @ApiProperty({
    example: 'Администратор',
    description: 'Описание роли пользователя',
  })
  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}

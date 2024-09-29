import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from '../roles/models/roles.model';
import { UserRoles } from '../roles/models/user-roles.model';
import { ApiProperty } from '@nestjs/swagger';

interface UserAttrs {
  readonly email: string;
  readonly password: string;
}

@Table({ tableName: 'users', timestamps: false })
export class User extends Model<User, UserAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @Column({ type: DataType.TEXT, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '12345', description: 'Пароль' })
  @Column({ type: DataType.TEXT, allowNull: false })
  password: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}

import { Column, DataType, Model, Table, HasOne } from 'sequelize-typescript';
import { UsersTgAccess } from './users-tg-access.model';
import { ApiProperty } from '@nestjs/swagger';

interface UsersTgAttrs {
  readonly id: number;
  readonly id_tg: string;
}

@Table({ tableName: 'users_tg', timestamps: false })
export class UsersTg extends Model<UsersTg, UsersTgAttrs> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '1234567890',
    description: 'Идентификатор пользователя телеграм-бота',
  })
  @Column({ type: DataType.TEXT, unique: true })
  id_tg: string;

  @ApiProperty({
    example: 'Иванов И.И.',
    description: 'Полное имя пользователя телеграм-бота',
  })
  @Column({ type: DataType.TEXT, defaultValue: '-' })
  full_name: string;

  @HasOne(() => UsersTgAccess)
  access: UsersTgAccess;
}

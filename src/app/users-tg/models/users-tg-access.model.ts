import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UsersTg } from './users-tg.model';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'users_tg_access', timestamps: false })
export class UsersTgAccess extends Model<UsersTgAccess> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: true,
    description: 'Поиск ТП в телеграм-боте',
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  tp_search: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  tp_report: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  tp_add: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  tp_update: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  tp_delete: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  users_report: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  user_add: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  user_delete: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  help: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  users_access_report: boolean;

  @BelongsTo(() => UsersTg)
  user_tg: UsersTg;

  @ForeignKey(() => UsersTg)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_tg_id: number;
}
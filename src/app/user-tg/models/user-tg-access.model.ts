import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserTg } from './user-tg.model';

@Table({ tableName: 'users_tg_access', timestamps: false })
export class UserTgAccess extends Model<UserTgAccess> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  tp_search: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  tp_report: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  tp_add: boolean;

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

  @BelongsTo(() => UserTg)
  user_tg: UserTg;

  @ForeignKey(() => UserTg)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_tg_id: number;
}

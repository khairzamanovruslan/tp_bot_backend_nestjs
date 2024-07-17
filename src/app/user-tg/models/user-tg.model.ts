import { Column, DataType, Model, Table, HasOne } from 'sequelize-typescript';
import { UserTgAccess } from './user-tg-access.model';

interface UserTgAttrs {
  readonly id_tg: string;
  readonly access_bot: boolean;
}

@Table({ tableName: 'users_tg', timestamps: false })
export class UserTg extends Model<UserTg, UserTgAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.TEXT, unique: true })
  id_tg: string;

  @Column({ type: DataType.TEXT, defaultValue: '-' })
  full_name: string;

  @HasOne(() => UserTgAccess)
  access: UserTgAccess;
}

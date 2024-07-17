import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface SubstationAttrs {
  readonly id: number;
  readonly name: string;
  readonly latitude: string;
  readonly longitude: string;
}

@Table({ tableName: 'substation', timestamps: false })
export class Substation extends Model<Substation, SubstationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({ type: DataType.TEXT, unique: true })
  name: string;
  @Column({ type: DataType.TEXT })
  latitude: string;
  @Column({ type: DataType.TEXT })
  longitude: string;
}

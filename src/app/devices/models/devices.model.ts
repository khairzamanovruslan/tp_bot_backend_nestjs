import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DeviceTypeObject } from './devices-type-object.model';

interface DevicesAttrs {
  readonly id: number;
  readonly name: string;
  readonly latitude: string;
  readonly longitude: string;
  readonly type_object_id: number;
}

@Table({ tableName: 'devices', timestamps: false })
export class Devices extends Model<Devices, DevicesAttrs> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '777', description: 'Имя объекта электроэнергетики' })
  @Column({ type: DataType.TEXT, unique: true })
  name: string;

  @ApiProperty({ example: '60.504975', description: 'Широта' })
  @Column({ type: DataType.TEXT })
  latitude: string;

  @ApiProperty({ example: '57.042185', description: 'Долгота' })
  @Column({ type: DataType.TEXT })
  longitude: string;

  @ForeignKey(() => DeviceTypeObject)
  @Column({
    type: DataType.INTEGER,
  })
  type_object_id: number;

  @BelongsTo(() => DeviceTypeObject)
  type_object: DeviceTypeObject;
}

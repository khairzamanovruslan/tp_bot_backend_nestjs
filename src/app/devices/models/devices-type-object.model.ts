import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Devices } from './devices.model';

interface DeviceTypeObjectAttrs {
  readonly name: string;
}

@Table({ tableName: 'devices_type_object', timestamps: false })
export class DeviceTypeObject extends Model<
  DeviceTypeObject,
  DeviceTypeObjectAttrs
> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'ТП', description: 'Тип объекта' })
  @Column({ type: DataType.TEXT, unique: true })
  name: string;

  @HasMany(() => Devices)
  devices: Devices[];
}

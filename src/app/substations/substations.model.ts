import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface SubstationsAttrs {
  readonly id: number;
  readonly name: string;
  readonly latitude: string;
  readonly longitude: string;
}

@Table({ tableName: 'substations', timestamps: false })
export class Substations extends Model<Substations, SubstationsAttrs> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '777', description: 'Имя подстанции' })
  @Column({ type: DataType.TEXT, unique: true })
  name: string;

  @ApiProperty({ example: '60.504975', description: 'Широта' })
  @Column({ type: DataType.TEXT })
  latitude: string;

  @ApiProperty({ example: '57.042185', description: 'Долгота' })
  @Column({ type: DataType.TEXT })
  longitude: string;
}

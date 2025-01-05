import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceDto {
  @ApiProperty({ example: '777', description: 'Имя объекта электроэнергетики' })
  readonly name: string;

  @ApiProperty({ example: '60.504975', description: 'Широта' })
  readonly latitude: string;

  @ApiProperty({ example: '57.042185', description: 'Долгота' })
  readonly longitude: string;

  @ApiProperty({ example: '1', description: 'Тип объекта' })
  readonly type_object_id: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class CreateSubstationDto {
  @ApiProperty({ example: '777', description: 'Имя подстанции' })
  readonly name: string;

  @ApiProperty({ example: '60.504975', description: 'Широта' })
  readonly latitude: string;

  @ApiProperty({ example: '57.042185', description: 'Долгота' })
  readonly longitude: string;
}

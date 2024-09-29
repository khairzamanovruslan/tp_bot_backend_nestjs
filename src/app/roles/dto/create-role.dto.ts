import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Роль' })
  @IsString({ message: 'Должно быть строкой' })
  readonly value: string;

  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserTgDto {
  @ApiProperty({
    example: '1234567890',
    description: 'Идентификатор пользователя телеграм-бота',
    required: true,
  })
  readonly id_tg: string;

  @ApiProperty({
    example: 'Иванов И.И.',
    description: 'Полное имя пользователя телеграм-бота',
  })
  readonly full_name: string;
}

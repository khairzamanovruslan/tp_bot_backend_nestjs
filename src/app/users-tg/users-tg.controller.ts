import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UsersTgService } from './users-tg.sevice';
import { UsersTg } from './models/users-tg.model';
import { CreateUserTgDto } from './dto/create-user-tg.dto';

@ApiTags('Пользователи Телеграм-бота')
@Controller('users-tg')
export class UsersTgController {
  constructor(private usersTgService: UsersTgService) {}

  @ApiOperation({
    summary: 'Поиск всех пользователей телеграм-бота',
    description: 'Возвращает список пользователей телеграм-бота',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная операция',
    type: [UsersTg],
  })
  @Get()
  getAllUsers() {
    return this.usersTgService.getAllUsersTg();
  }

  @ApiOperation({
    summary: 'Поиск всех пользователей с правами доступа к телеграма-боту',
    description:
      'Возвращает список пользователей с правами доступа к телеграма-боту',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная операция',
    type: [UsersTg],
  })
  @Get('access')
  getAllUsersAndAccess() {
    return this.usersTgService.getAllUsersTgAndAccess();
  }

  @ApiOperation({
    summary: 'Добавить нового пользователя телеграм-бота',
    description: 'Возвращает нового пользователя телеграм-бота',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная операция',
    type: UsersTg,
  })
  @Post()
  async createUser(@Body() userTgDto: CreateUserTgDto) {
    return this.usersTgService.createUserTgFromWeb(userTgDto);
  }

  @ApiOperation({
    summary: 'Удалить пользователя телеграм-бота',
    description: 'Возвращает булевое значение',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'При удалении вернет true',
    type: Boolean,
  })
  @ApiParam({ name: 'id_tg', required: true, description: 'Имя подстанции' })
  @Delete('/:id_tg')
  async delete(@Param('id_tg') id_tg: string) {
    return this.usersTgService.delete(id_tg);
  }
}

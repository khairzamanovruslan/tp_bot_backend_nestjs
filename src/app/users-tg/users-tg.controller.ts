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
    summary: 'Поиск всех пользователей (с правами доступа)',
    description: 'Возвращает список пользователей (с правами доступа)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная операция',
    type: [UsersTg],
  })
  @Get('access')
  async getAllUsersAndAccess() {
    return this.usersTgService.getAllUsersTgAndAccess();
  }

  @ApiOperation({
    summary: 'Поиск всех пользователей',
    description: 'Возвращает список пользователей',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная операция',
    type: [UsersTg],
  })
  @Get()
  async getAllUsers() {
    return this.usersTgService.getAllUsersTg();
  }

  @ApiOperation({
    summary: 'Поиск пользователя (с правами доступа)',
    description: 'Возвращает пользователя',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная операция',
    type: UsersTg,
  })
  @Get('/:id_tg')
  async getUser(@Param('id_tg') id_tg: string) {
    return this.usersTgService.getOneUserTgAndAccess(id_tg);
  }

  @ApiOperation({
    summary: 'Добавить нового пользователя',
    description: 'Возвращает нового пользователя',
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
    summary: 'Удалить пользователя',
    description: 'Возвращает булевое значение',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'При удалении вернет true',
    type: Boolean,
  })
  @ApiParam({
    name: 'id_tg',
    required: true,
    description: 'id пользователя телеграма',
  })
  @Delete('/:id_tg')
  async delete(@Param('id_tg') id_tg: string) {
    /* return this.usersTgService.delete(id_tg); */
    return 'Будем считать что данные удалены!';
  }
}

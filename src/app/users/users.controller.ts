import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@ApiTags('Пользователи веб-сайта')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({
    summary: 'Добавить нового пользователя',
    description: 'Возвращает нового пользователя',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная операция',
    type: User,
  })
  @Post()
  async createUser(@Body() userDto: CreateUserDto) {
    /* return this.usersService.createUser(userDto); */
    return 'Добавить нового пользователя';
  }

  @ApiOperation({
    summary: 'Поиск всех пользователей',
    description: 'Возвращает список пользователей',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная операция',
    type: [User],
  })
  @Get()
  getAllUsers() {
    /* return this.usersService.getAll(); */
    return 'Поиск всех пользователей';
  }
}

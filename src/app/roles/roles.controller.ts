import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './models/roles.model';

@ApiTags('Роли пользователей веб-сайта')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({
    summary: 'Добавить новую роль',
    description: 'Возвращает новую роль',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная операция',
    type: Role,
  })
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @ApiOperation({
    summary: 'Поиск роли',
    description: 'Возвращает одну роль',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная операция',
    type: Role,
  })
  @ApiParam({ name: 'value', required: true, description: 'Название роли' })
  @Get(':value')
  getByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }

  @ApiOperation({
    summary: 'Поиск всех ролей',
    description: 'Возвращает список ролей',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная операция',
    type: [Role],
  })
  @Get()
  getAllRoles() {
    return this.rolesService.getAllRoles();
  }
}

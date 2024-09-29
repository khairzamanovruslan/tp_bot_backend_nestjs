import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { SubstationsService } from './substations.sevice';
import { Substations } from './substations.model';
import { CreateSubstationDto } from './dto/create-substation.dto';
import { UpdateSubstationDto } from './dto/update-substation.dto';

@ApiTags('Подстанции')
@Controller('substations')
export class SubstationsController {
  constructor(private substationsService: SubstationsService) {}

  @ApiOperation({
    summary: 'Поиск всех подстанций',
    description: 'Возвращает список подстанций',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная операция',
    type: [Substations],
  })
  @Get()
  getSubstationsAll() {
    return this.substationsService.getAll();
  }

  @ApiOperation({
    summary: 'Поиск подстанции по имени',
    description: 'Возвращает одну подстанцию',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная операция',
    type: Substations,
  })
  @ApiParam({ name: 'name', required: true, description: 'Имя подстанции' })
  @Get('/:name')
  getSubstationOne(@Param('name') name: string) {
    return this.substationsService.getOneByName(name);
  }

  @ApiOperation({
    summary: 'Добавить новую подстанцию',
    description: 'Возвращает созданную подстанцию',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная операция',
    type: Substations,
  })
  @Post()
  async createUser(@Body() substationDto: CreateSubstationDto) {
    return this.substationsService.create(substationDto);
  }

  @ApiOperation({
    summary: 'Удалить подстанцию по имени',
    description: 'Возвращает булевое значение',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная операция',
    type: Boolean,
  })
  @ApiParam({ name: 'name', required: true, description: 'Имя подстанции' })
  @Delete('/:name')
  async delete(@Param('name') name: string) {
    return this.substationsService.delete(name);
  }

  @ApiOperation({
    summary: 'Обновить подстанцию по имени',
    description: 'Возвращает булевое значение',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная операция',
    type: Boolean,
  })
  @ApiParam({ name: 'name', required: true, description: 'Имя подстанции' })
  @Put('/:name')
  async update(
    @Body() substationDto: UpdateSubstationDto,
    @Param('name') name: string,
  ) {
    return this.substationsService.update(name, substationDto);
  }
}

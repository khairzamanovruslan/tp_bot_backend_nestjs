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
import { DevicesService } from './devices.sevice';
import { Devices } from './models/devices.model';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@ApiTags('Объекты электроэнергетики')
@Controller('devices')
export class DevicesController {
  constructor(private devicesService: DevicesService) {}

  @ApiOperation({
    summary: 'Поиск "девайстов"',
    description: 'Возвращает список "девайсов"',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная операция',
    type: [Devices],
  })
  @Get()
  getAllTypesObjectWithDevices() {
    /* return this.devicesService.getAllTypesObjectWithDevices(); */
    return 'Поиск "девайстов"';
  }

  @ApiOperation({
    summary: 'Поиск "девайса" по имени',
    description: 'Возвращает "девайс"',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная операция',
    type: Devices,
  })
  @ApiParam({ name: 'name', required: true, description: 'Имя "девайса"' })
  @Get('/:name')
  getDeviceOne(@Param('name') name: string) {
    /* return this.devicesService.getOneByName(name); */
    return 'Поиск "девайса" по имени';
  }

  @ApiOperation({
    summary: 'Добавить "девайс"',
    description: 'Возвращает новый "девайс"',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная операция',
    type: Devices,
  })
  @Post()
  async createDevice(@Body() deviceDto: CreateDeviceDto) {
    /* return this.devicesService.createDevice(deviceDto); */
    return 'Добавить "девайс"';
  }

  @ApiOperation({
    summary: 'Удалить "девайс" по имени',
    description: 'Возвращает булевое значение',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная операция',
    type: Boolean,
  })
  @ApiParam({ name: 'name', required: true, description: 'Имя "девайса"' })
  @Delete('/:name')
  async deleteDevice(@Param('name') name: string) {
    /* return this.devicesService.deleteDevice(name); */
    return 'Удалить "девайс" по имени';
  }

  @ApiOperation({
    summary: 'Обновить "девайс" по имени',
    description: 'Возвращает булевое значение',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная операция',
    type: Boolean,
  })
  @ApiParam({ name: 'name', required: true, description: 'Имя "девайса"' })
  @Put('/:name')
  async updateDevice(
    @Body() deviceDto: UpdateDeviceDto,
    @Param('name') name: string,
  ) {
    /* return this.devicesService.updateDevice(name, deviceDto); */
    return 'Обновить "девайс" по имени';
  }
}

import { Controller, Get } from '@nestjs/common';
import { SubstationService } from './substation.sevice';

@Controller('substation')
export class SubstationController {
  constructor(private substationService: SubstationService) {}

  @Get('/all')
  getSubstationsAll() {
    return this.substationService.getAll();
  }
  @Get('/one')
  getSubstationOne(name = '111') {
    return this.substationService.getOneByName(name);
  }
}

import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { MainService } from './main.service';

@ApiTags('Главная')
@Controller()
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @ApiExcludeEndpoint()
  @Get()
  main(): string {
    /* return this.mainService.main(); */
    return 'Главная';
  }
}

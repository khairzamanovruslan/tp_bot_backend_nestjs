import { Injectable } from '@nestjs/common';

@Injectable()
export class MainService {
  main(): string {
    return 'Веб-приложение';
  }
}

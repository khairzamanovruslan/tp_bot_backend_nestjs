import { ConfigModule } from '@nestjs/config';

export function configModule() {
  return ConfigModule.forRoot({
    envFilePath: '.env',
  });
}

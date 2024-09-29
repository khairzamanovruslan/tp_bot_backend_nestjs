import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerModule } from './config/swagger.module';

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule, { cors: true });
  swaggerModule(app);
  await app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порту!`));
}
bootstrap();

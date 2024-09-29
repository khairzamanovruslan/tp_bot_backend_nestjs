import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function swaggerModule(app) {
  const config = new DocumentBuilder()
    .setTitle('РОССЕТИ')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
}

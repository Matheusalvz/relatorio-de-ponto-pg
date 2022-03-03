import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  
  const config = app.get(ConfigService);
  
  const HTTP_PORT = config.get<string>('HTTP_PORT');
  await app.listen(HTTP_PORT);
}
bootstrap();

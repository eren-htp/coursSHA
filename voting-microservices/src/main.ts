import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();  // Active CORS pour permettre les requêtes depuis React
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

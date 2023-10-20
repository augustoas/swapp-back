import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './helpers/response.interceptor';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for all routes
  app.setGlobalPrefix('backend'); // This adds /backend to all routes
  // Increase the payload size limit
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ limit: '5mb', extended: true }));
  // Register the interceptor globally
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(4000);
}
bootstrap();

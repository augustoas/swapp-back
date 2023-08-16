import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for all routes
  // Alternatively, you can set CORS options explicitly:
  // app.enableCors({
  //   origin: 'http://example.com', // Allow requests from this origin
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   allowedHeaders: 'Content-Type,Authorization',
  //   credentials: true, // Enable sending cookies
  // });

  await app.listen(4000);
}
bootstrap();

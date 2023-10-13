import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './helpers/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('backend'); // This adds /backend to all routes
  app.enableCors(); // Enable CORS for all routes
  app.setGlobalPrefix('backend'); // This adds /backend to all routes
  // Alternatively, you can set CORS options explicitly:
  // app.enableCors({
  //   origin: 'http://example.com', // Allow requests from this origin
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   allowedHeaders: 'Content-Type,Authorization',
  //   credentials: true, // Enable sending cookies
  // });
  // Register the interceptor globally
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(4000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(cookieParser());

  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(3000);
  console.log('🚀 서버 실행 중: http://localhost:3000');
}
bootstrap();

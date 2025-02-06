import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(cookieParser());

  console.log('서버가 정상적으로 시작 되었습니다');
  await app.listen(3000);
  console.log('🚀 서버 실행 중: http://localhost:3000');
}
bootstrap();

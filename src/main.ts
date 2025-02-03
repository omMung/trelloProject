// import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log("서버가 정상적으로 시작 되었습니다")
  await app.listen(3000);
}
bootstrap();

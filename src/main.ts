import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ CORS 설정
  app.enableCors({
    origin: '*', // 🔹 허용할 도메인 추가
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  await app.listen(3000);
  console.log('🚀 서버 실행 중: http://localhost:3000');
}
bootstrap();

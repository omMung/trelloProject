import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ CORS 설정 (모든 출처 허용)
  app.use(
    cors({
      origin: 'https://www.yangs.site', // 🔹 허용할 도메인 설정
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    }),
  );

  await app.listen(3000);
  console.log('🚀 서버 실행 중: http://localhost:3000');
}
bootstrap();

// import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // // 전역 ValidationPipe 설정
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, // DTO에 정의되지 않은 필드를 제거합니다.
  //     forbidNonWhitelisted: true, // DTO에 정의되지 않은 필드가 있으면 에러를 발생시킵니다.
  //     transform: true, // 요청 데이터를 DTO 타입으로 자동 변환합니다.
  //     transformOptions: {
  //       enableImplicitConversion: true, // 암시적 변환을 활성화합니다.
  //     },
  //     // optional: validation 실패 시 사용자 정의 에러 메시지를 반환할 수 있습니다.
  //     // exceptionFactory: (errors) => new BadRequestException(errors),
  //   }),
  // );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

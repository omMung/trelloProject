import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 기본 API 상태 확인
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 서버 상태 확인
  @Get('status')
  getStatus(): Record<string, any> {
    return this.appService.getStatus();
  }

  @Get('alarms/:userId')
  async getUserAlarms(@Param('userId', ParseIntPipe) userId: number) {
    return await this.appService.getUserAlarms(userId);
  }
}

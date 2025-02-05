import { Injectable } from '@nestjs/common';
import { AlarmsService } from './alarms/alarms.service';

@Injectable()
export class AppService {
  constructor(private readonly alarmsService: AlarmsService) {}

  // 기본 API 상태 확인
  getHello(): string {
    return '서버가 정상적으로 실행 중입니다!';
  }

  // 서버 상태 확인 API
  getStatus(): Record<string, any> {
    return {
      status: '서버 정상 작동 중',
      timestamp: new Date().toISOString(),
    };
  }

  // 특정 사용자의 알람 조회
  async getUserAlarms(userId: number) {
    return await this.alarmsService.getAlarmsByUser(userId);
  }
}

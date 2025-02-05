import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AlarmsService } from './alarms.service';
import { CreateAlarmDto } from './dto/create-alarm.dto';

@WebSocketGateway({ cors: true }) // WebSocket 게이트웨이 설정 (CORS 허용)
export class AlarmsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly alarmsService: AlarmsService) {}

  // 클라이언트가 알림 요청을 보낼 때
  @SubscribeMessage('sendAlarm')
  async handleSendAlarm(@MessageBody() createAlarmDto: CreateAlarmDto) {
    const alarm = await this.alarmsService.createAlarm(createAlarmDto);

    // 특정 사용자에게 알림 전송
    this.server.to(`user-${createAlarmDto.userId}`).emit('receiveAlarm', alarm);
    return alarm;
  }

  // 클라이언트가 소켓 연결할 때 특정 룸에 가입
  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId;
    if (userId) {
      client.join(`user-${userId}`);
      console.log(`User ${userId} connected to WebSocket`);
    }
  }

  // 클라이언트 연결 해제 시
  handleDisconnect(client: Socket) {
    console.log(`User disconnected: ${client.id}`);
  }
}

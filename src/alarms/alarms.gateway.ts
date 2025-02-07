// alarms.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: 'https://www.yangs.site', credentials: true },
}) // CORS 설정 추가
export class AlarmsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId;
    if (userId) {
      client.join(`user-${userId}`);
      console.log(`User ${client.id} 웹소켓 연결 성공`);
    }
  }

  notifyUser(userId: number) {
    this.server.to(`user-${userId}`).emit('receiveAlarm');
    console.log(`📢 유저 ${userId}에게 새 알림 신호 전송`);
  }

  handleDisconnect(client: Socket) {
    console.log(`웹소켓 연결 종료: ${client.id}`);
  }
}

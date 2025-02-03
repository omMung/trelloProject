import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity'
import { List } from '../lists/entities/list.entity'
import { Card } from '../cards/entities/card.entity'
import { AuthController } from '../auth/controllers/auth.controller';
import { AuthService } from '../auth/services/auth.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Board , List , Card])
  ], // 리포지토리를 등록하기 위한 설정
  controllers: [BoardsController, AuthController],
  providers: [BoardsService, AuthService],
  exports: [BoardsService, AuthService]
})
export class BoardsModule {}

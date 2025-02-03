import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity'
import { List } from '../lists/entities/list.entity'
import { Card } from '../cards/entities/card.entity'


@Module({
  imports: [
    TypeOrmModule.forFeature([Board , List , Card])
  ], // 리포지토리를 등록하기 위한 설정
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}

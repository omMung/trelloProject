import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity'
import { List } from '../lists/entities/list.entity'
import { Card } from '../cards/entities/card.entity'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board , List , Card]),
    JwtModule.register({}),
    UsersModule
  ], // 리포지토리를 등록하기 위한 설정
  controllers: [BoardsController],
  providers: [BoardsService, JwtAuthGuard],
})
export class BoardsModule {}

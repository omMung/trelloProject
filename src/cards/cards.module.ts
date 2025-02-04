import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { Card } from './entities/card.entity';
import { List } from 'src/lists/entities/list.entity';
import { Board } from 'src/boards/entities/board.entity';
import { Member } from 'src/members/entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card, List, Board, Member])],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}

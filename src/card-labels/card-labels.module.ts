import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardLabel } from './entities/card-label.entity';
import { CardLabelsService } from './card-labels.service';
import { CardLabelsController } from './card-labels.controller';
import { Label } from 'src/labels/entities/label.entity';
import { Card } from 'src/cards/entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CardLabel, Label, Card])],
  controllers: [CardLabelsController],
  providers: [CardLabelsService],
})
export class CardLabelsModule {}

import { Module } from '@nestjs/common';
import { CardLabelsService } from './card-labels.service';
import { CardLabelsController } from './card-labels.controller';

@Module({
  controllers: [CardLabelsController],
  providers: [CardLabelsService],
})
export class CardLabelsModule {}

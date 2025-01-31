import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardLabel } from './entities/card-label.entity';
import { CardLabelsService } from './card-labels.service';
import { CardLabelsController } from './card-labels.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CardLabel])],
  controllers: [CardLabelsController],
  providers: [CardLabelsService],
})
export class CardLabelsModule {}

import { Module } from '@nestjs/common';
import { CheckitemsService } from './checkitems.service';
import { CheckitemsController } from './checkitems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckItem } from './entities/checkitem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckItem])],
  controllers: [CheckitemsController],
  providers: [CheckitemsService],
})
export class CheckitemsModule {}

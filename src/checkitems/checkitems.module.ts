import { Module } from '@nestjs/common';
import { CheckitemsService } from './checkitems.service';
import { CheckitemsController } from './checkitems.controller';

@Module({
  controllers: [CheckitemsController],
  providers: [CheckitemsService],
})
export class CheckitemsModule {}

import { Module } from '@nestjs/common';
import { CheckitemsService } from './checkitems.service';
import { ChecklistsService } from 'src/checklists/checklists.service';

import { CheckitemsController } from './checkitems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckItem } from './entities/checkitem.entity';
import { CheckList } from 'src/checklists/entities/checklist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckItem, CheckList])],
  controllers: [CheckitemsController],
  providers: [CheckitemsService, ChecklistsService],
})
export class CheckitemsModule {}

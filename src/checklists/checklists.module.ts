import { Module } from '@nestjs/common';
import { ChecklistsService } from './checklists.service';
import { ChecklistsController } from './checklists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckList } from './entities/checklist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckList])],
  controllers: [ChecklistsController],
  providers: [ChecklistsService],

  exports: [ChecklistsService],
})
export class ChecklistsModule {}

import { PickType } from '@nestjs/mapped-types';
import { CheckList } from '../entities/checklist.entity';

export class CreateChecklistDto extends PickType(CheckList, [
  'title',
] as const) {}

import { PickType } from '@nestjs/mapped-types';
import { CheckList } from '../entities/checklist.entity';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

// export class CreateChecklistDto extends PickType(CheckList, [
//   'title',
// ] as const) {}

export class CreateChecklistDto {
  @IsInt()
  @IsNotEmpty()
  cardId: number;

  @IsString()
  @IsNotEmpty()
  title: string;
}

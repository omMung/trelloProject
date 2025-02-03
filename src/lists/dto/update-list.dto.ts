// src/lists/dto/update-list.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateListDto } from './create-list.dto';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateListDto extends PartialType(CreateListDto) {
  @IsInt()
  @Min(1)
  @IsOptional()
  boardId?: number;

  @IsString()
  @IsOptional()
  title?: string;
}

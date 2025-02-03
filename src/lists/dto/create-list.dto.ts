// src/lists/dto/create-list.dto.ts
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateListDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  boardId: number;

  @IsString()
  @IsNotEmpty()
  title: string;
}

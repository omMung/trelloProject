// src/lists/dto/update-list-positions.dto.ts
import { IsInt, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ListPositionUpdate {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsInt()
  @IsNotEmpty()
  position: number;
}

export class UpdateListPositionsDto {
  @IsInt()
  @IsNotEmpty()
  boardId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ListPositionUpdate)
  lists: ListPositionUpdate[];
}

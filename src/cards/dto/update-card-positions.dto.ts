// src/lists/dto/update-list-positions.dto.ts
import { IsInt, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CardPositionUpdate {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsInt()
  @IsNotEmpty()
  position: number;
}

export class UpdateCardPositionsDto {
  @IsInt()
  @IsNotEmpty()
  listId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CardPositionUpdate)
  cards: CardPositionUpdate[];

  // ex) CardPositionUpdate.cards = [
  // { "id": 1, "position": 1 },
  // { "id": 2, "position": 2 },
  // { "id": 3, "position": 3 }
  // ];
  // 클라이언트에서 포지션 순으로 정렬된 lists를 보내준다고 가정
}

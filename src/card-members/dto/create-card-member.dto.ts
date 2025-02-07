import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCardMemberDto {
  @IsNotEmpty()
  @IsNumber()
  cardId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

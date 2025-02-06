import { IsNumber } from 'class-validator';

export class FindCardDto {
  @IsNumber()
  listId: Number;
}

import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateChecklistDto {
  @IsInt()
  @IsNotEmpty()
  cardId: number;

  @IsString()
  @IsNotEmpty()
  title: string;
}

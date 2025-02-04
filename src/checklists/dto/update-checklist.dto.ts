import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateChecklistDto {
  @IsInt()
  @IsNotEmpty()
  cardId: number;

  @IsString()
  title: string;

  @IsString()
  position: number;
}

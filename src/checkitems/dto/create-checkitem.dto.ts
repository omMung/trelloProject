import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCheckitemDto {
  @IsInt()
  @IsNotEmpty()
  checkListId: number;

  @IsString()
  @IsNotEmpty()
  title: string;
}

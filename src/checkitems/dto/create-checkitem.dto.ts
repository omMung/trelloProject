import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCheckitemDto {
  @IsInt()
  @IsNotEmpty()
  checklistId: number;

  @IsString()
  @IsNotEmpty()
  title: string;
}

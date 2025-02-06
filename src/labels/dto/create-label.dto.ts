import {
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateLabelDto {
  @IsString()
  @Length(1, 10)
  title: string;

  @IsNotEmpty({ message: '색상을 선택해주세요.' })
  @IsString()
  @IsHexColor()
  color: string;

  @IsNotEmpty()
  @IsNumber()
  boardId: number;
}

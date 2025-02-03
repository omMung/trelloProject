import {
  IsString,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  IsHexColor,
} from 'class-validator';

export class CreateCardDto {
  @IsNumber()
  board_id: Number;

  @IsNumber()
  list_id: Number;

  @IsNotEmpty({ message: '제목을 입력해주세요.' })
  @IsString()
  title: String;

  @IsString()
  @IsHexColor()
  color?: String;

  @IsString()
  description?: String;

  @IsString()
  startData?: String;

  @IsString()
  dueData?: String;

  @IsBoolean()
  status?: boolean;
}

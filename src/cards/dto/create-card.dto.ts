import {
  IsString,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  IsHexColor,
} from 'class-validator';

export class CreateCardDto {
  @IsNumber()
  boardId: Number;

  @IsNumber()
  listId: Number;

  @IsNotEmpty({ message: '제목을 입력해주세요.' })
  @IsString()
  title: String;

  @IsString()
  @IsHexColor()
  color?: String;

  @IsString()
  description?: String;

  @IsString()
  startDate?: String;

  @IsString()
  dueDate?: String;

  @IsBoolean()
  status?: boolean;
}

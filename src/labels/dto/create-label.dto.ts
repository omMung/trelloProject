import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLabelDto {
  @IsString()
  title: string;

  @IsNotEmpty({ message: '색상을 선택해주세요.' })
  @IsString()
  color: string;
}

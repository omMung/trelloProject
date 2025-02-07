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

//클래스 밸리데이터, 이스옵티멀, 이스낫엠티
//비어있어도 수정되게

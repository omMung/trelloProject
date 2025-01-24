import { IsInt, IsNotEmpty } from 'class-validator';

export class RemoveCommentDto {
  @IsInt()
  @IsNotEmpty({ message: '댓글 ID를 입력해주세요.' })
  readonly id: number;

  //   @IsInt()
  //   @IsNotEmpty({ message: '사용자 ID를 입력해주세요.' })
  //   readonly userId: number;
}

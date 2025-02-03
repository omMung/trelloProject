import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCardLabelDto {
  @IsNotEmpty({ message: '카드를 선택해주세요.' })
  @IsNumber()
  cardId: number;

  @IsNotEmpty({ message: '라벨을 선택해주세요.' })
  @IsNumber()
  labelId: number;
}

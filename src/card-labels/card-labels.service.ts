import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CardLabel } from './entities/card-label.entity';
import { CreateCardLabelDto } from './dto/create-card-label.dto';
import { UpdateCardLabelDto } from './dto/update-card-label.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from 'src/cards/entities/card.entity';
import { Label } from 'src/labels/entities/label.entity';

@Injectable()
export class CardLabelsService {
  constructor(
    @InjectRepository(CardLabel)
    private readonly cardLabelRepository: Repository<CardLabel>,
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @InjectRepository(Label)
    private readonly labelRepository: Repository<Label>,
  ) {}

  async create(createCardLabelDto: CreateCardLabelDto) {
    try {
      const { cardId, labelId } = createCardLabelDto;
      const card = await this.cardRepository.findOneBy({ id: cardId });
      if (!card) {
        throw new BadRequestException(`해당하는 카드가 존재하지 않습니다.`);
      }

      // Label 존재 여부 확인
      const label = await this.labelRepository.findOneBy({ id: labelId });
      if (!label) {
        throw new BadRequestException(`해당하는 라벨이 존재하지 않습니다.`);
      }
      const cardLabel = this.cardLabelRepository.create(createCardLabelDto);
      return await this.cardLabelRepository.save(cardLabel);
    } catch (err) {
      //전역 예외 처리 필터 준비
      if (err.code === 'ER_DUP_ENTRY') {
        //typeorm 유니크키 충돌오류
        throw new ConflictException(`이미 지정되어 있는 라벨입니다.`);
      }
      throw new InternalServerErrorException('서버에 오류가 발생하였습니다.');
    }
  }

  findAll() {
    return `This action returns all cardLabels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cardLabel`;
  }

  update(id: number, updateCardLabelDto: UpdateCardLabelDto) {
    return `This action updates a #${id} cardLabel`;
  }

  async remove(id: number) {
    const cardLabel = await this.cardLabelRepository.findOneBy({ id });
    if (!cardLabel) {
      throw new NotFoundException(`해당하는 지정 라벨이 존재하지 않습니다.`);
    }
    await this.cardLabelRepository.delete(id);
    return `This action removes a #${id} cardLabel`;
  }
}

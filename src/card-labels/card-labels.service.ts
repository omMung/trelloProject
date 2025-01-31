import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CardLabel } from './entities/card-label.entity';
import { CreateCardLabelDto } from './dto/create-card-label.dto';
import { UpdateCardLabelDto } from './dto/update-card-label.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CardLabelsService {
  constructor(
    @InjectRepository(CardLabel)
    private readonly cardLabelRepository: Repository<CardLabel>,
  ) {}

  async create(createCardLabelDto: CreateCardLabelDto) {
    const cardLabel = this.cardLabelRepository.create(createCardLabelDto);
    return await this.cardLabelRepository.save(cardLabel);
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
      throw new NotFoundException(
        `ID ${id}에 해당하는 지정 라벨이 존재하지 않습니다.`,
      );
    }
    await this.cardLabelRepository.delete(id);
    return `This action removes a #${id} cardLabel`;
  }
}

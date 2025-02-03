import _ from 'lodash';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
  ) {}

  async findLastPosition(): Promise<number> {
    const lastCard = await this.cardsRepository.find({
      order: {
        position: 'DESC',
      },
      take: 1,
    });
    return lastCard[0]?.position ?? 0;
  }

  async createCard(createCardDto: CreateCardDto): Promise<Card> {
    const { list_id, title, description, color, status } = createCardDto;
    const verifyListId = await this.listRepository.findOne({});
    const lastPosition = await this.findLastPosition();

    const card = this.cardsRepository.create({
      listId: Number(list_id),
      title: title as string,
      description: description as string,
      color: color as string,
      position: lastPosition + 1,
      status,
    });
    await this.cardsRepository.save(card);
    return card;
  }

  async findOne(id: number, listId: number): Promise<Card> {
    return await this.cardsRepository.findOneBy({ id, listId });
  }

  async updateCard(id: number, updateCardDto: UpdateCardDto) {
    const { list_id, title, description, color, status } = updateCardDto;
    await this.verifyCards(id, updateCardDto);
    await this.cardsRepository.update(
      { id }, // 조건
      {
        // 업데이트할 데이터
        listId: Number(list_id),
        title: title as string,
        description: description as string,
        color: color as string,
        status,
      },
    );
  }

  async deleteCard(id: number, listId: number): Promise<void> {
    await this.cardsRepository.delete({ id, listId });
  }

  private async verifyCards(id: number, updateCardDto: UpdateCardDto) {
    const pickCard = await this.cardsRepository.findOneBy({
      id,
    });

    if (_.isNil(pickCard) || pickCard.listId !== updateCardDto.list_id) {
      throw new NotFoundException(
        '메시지를 찾을 수 없거나 수정/삭제할 권한이 없습니다.',
      );
    }
  }
}

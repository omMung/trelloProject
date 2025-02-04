import _ from 'lodash';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { List } from 'src/lists/entities/list.entity';
import { Card } from './entities/card.entity';
import { Member } from 'src/members/entities/member.entity';
import { UpdateCardPositionsDto } from './dto/update-card-positions.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) private cardsRepository: Repository<Card>,
    @InjectRepository(List) private listsRepository: Repository<List>,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
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

  async createCard(req, createCardDto: CreateCardDto): Promise<Card> {
    const { listId, title, description, color, status } = createCardDto;

    const userId = await this.memberRepository.findOne({
      where: { userId: req.user.id },
    });
    if (_.isNil(userId)) {
      throw new NotFoundException('소속된 보드가 없습니다.');
    }

    const verifyListId = await this.listsRepository.findOne({
      where: { id: Number(listId) },
    });
    if (_.isNil(verifyListId)) {
      throw new NotFoundException(
        '메시지를 찾을 수 없거나 수정/삭제할 권한이 없습니다.',
      );
    }

    if (userId.boardId !== verifyListId.boardId) {
      throw new NotFoundException('해당 리스트는 보드에 존재하지 않습니다.');
    }

    const lastPosition = await this.findLastPosition();

    const card = this.cardsRepository.create({
      listId: Number(listId),
      title: title as string,
      description: description as string,
      color: color as string,
      position: lastPosition + 1,
      status,
    });
    await this.cardsRepository.save(card);
    return card;
  }

  async findOne(id: number, createCardDto: CreateCardDto): Promise<Card> {
    const byCard = await this.cardsRepository.findOneBy({ id });
    if (createCardDto.listId !== byCard.listId) {
      throw new NotFoundException('해당 리스트가 존재하지 않습니다.');
    }
    return byCard;
  }

  async updateCard(id: number, updateCardDto: UpdateCardDto) {
    const { listId, title, description, color, status } = updateCardDto;

    await this.verifyCards(id);
    await this.cardsRepository.update(
      { id }, // 조건
      {
        // 업데이트할 데이터
        listId: Number(listId),
        title: title as string,
        description: description as string,
        color: color as string,
        status,
      },
    );
  }

  async deleteCard(id: number): Promise<void> {
    await this.verifyCards(id);
    await this.cardsRepository.delete({ id });
  }

  private async verifyCards(id: number) {
    const pickCard = await this.cardsRepository.findOneBy({
      id,
    });

    if (_.isNil(pickCard)) {
      throw new NotFoundException('해당 카드를 찾을 수 없습니다.');
    }
  }

  async updatePositions(
    updateCardPositionsDto: UpdateCardPositionsDto,
  ): Promise<void> {
    const { listId, cards } = updateCardPositionsDto;

    const DBCards = await this.cardsRepository.find({
      where: { listId },
      select: ['id', 'position'],
    });

    if (cards.length !== DBCards.length) {
      throw new BadRequestException(
        '전송된 카드의 수가 리스트에 속한 카드의 수와 일치하지 않습니다.',
      );
    }

    const DBIds = DBCards.map((card) => card.id);
    const providedIds = cards.map((card) => card.id);
    const allIdsMatch = providedIds.every((id) => DBIds.includes(id));

    if (!allIdsMatch) {
      throw new BadRequestException(
        '일부 card ID가 지정된 리스트에 속해 있지 않습니다.',
      );
    }

    for (let i = 0; i < cards.length; i++) {
      if (cards[i].position !== i + 1) {
        throw new BadRequestException('잘못된 요청입니다');
      }
    }

    const updatePromises = cards.map((card) => {
      console.log(card);
      return this.cardsRepository.update(card.id, { position: card.position });
    });
    await Promise.all(updatePromises);
  }
}

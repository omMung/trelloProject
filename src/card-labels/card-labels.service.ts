import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { CardLabel } from './entities/card-label.entity';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from '../cards/entities/card.entity';
import { Label } from '../labels/entities/label.entity';
import { Member } from '../members/entities/member.entity';
import _ from 'lodash';

@Injectable()
export class CardLabelsService {
  constructor(
    @InjectRepository(CardLabel)
    private readonly cardLabelRepository: Repository<CardLabel>,
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @InjectRepository(Label)
    private readonly labelRepository: Repository<Label>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async create(userId: number, cardId: number, labelId: number) {
    try {
      const card = await this.cardRepository.findOne({
        where: { id: cardId },
        relations: ['list', 'list.board'],
      });

      if (!card || !card.list || !card.list.board) {
        throw new BadRequestException(
          `해당하는 카드가 존재하지 않거나 보드 정보를 찾을 수 없습니다.`,
        );
      }

      const boardId = card.list.board.id;

      // 보드 멤버 검증 (예외 발생)
      await this.isUserMember(userId, boardId);

      // Label 존재 여부 확인
      const label = await this.labelRepository.findOneBy({ id: labelId });
      if (!label) {
        throw new BadRequestException(`해당하는 라벨이 존재하지 않습니다.`);
      }

      const cardLabel = this.cardLabelRepository.create({ cardId, labelId });
      return await this.cardLabelRepository.save(cardLabel);
    } catch (err) {
      if (
        err instanceof BadRequestException ||
        err instanceof ForbiddenException
      ) {
        throw err; // 이미 정의된 예외는 그대로 throw
      }
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(`이미 지정되어 있는 라벨입니다.`);
      }
      throw new InternalServerErrorException('서버에 오류가 발생하였습니다.');
    }
  }

  async findAll(userId: number, boardId: number) {
    try {
      return await this.cardLabelRepository.find({
        where: {},
      });
    } catch (err) {
      throw new InternalServerErrorException('서버에 오류가 발생하였습니다.');
    }
  }

  async update(id: number, cardId: number, labelId: number) {
    const cardLabel = await this.cardLabelRepository.findOneBy({ id: cardId });
    if (!cardLabel) {
      throw new NotFoundException(`해당하는 카드 라벨이 존재하지 않습니다.`);
    }
    const label = await this.labelRepository.findOneBy({ id: labelId });
    if (!label) {
      throw new BadRequestException(`해당하는 라벨이 존재하지 않습니다.`);
    }

    // 업데이트 진행
    Object.assign(cardLabel, { cardId: cardId, labelId: labelId });
    return await this.cardLabelRepository.save(cardLabel);
  }

  async remove(id: number) {
    const cardLabel = await this.cardLabelRepository.findOneBy({ id });
    if (!cardLabel) {
      throw new NotFoundException(`해당하는 지정 라벨이 존재하지 않습니다.`);
    }

    await this.cardLabelRepository.delete(id);
    return `지정 라벨을 삭제하였습니다.`;
  }

  async isUserMember(userId: number, boardId: number): Promise<void> {
    const member = await this.memberRepository.findOne({
      where: { userId, boardId },
    });

    if (!member) {
      throw new ForbiddenException('보드 멤버가 아닙니다.');
    }
  }
}

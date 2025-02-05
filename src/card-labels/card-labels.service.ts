import { Injectable } from '@nestjs/common';
import { CardLabel } from './entities/card-label.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from '../cards/entities/card.entity';
import { Label } from '../labels/entities/label.entity';
import { Member } from '../members/entities/member.entity';
import _ from 'lodash';
import {
  BoardMembersForbiddenException,
  CardLabelConflictException,
  CardLabelInternalServerErrorException,
  CardLabelNotFoundException,
  CardNotFoundException,
  LabelNotFoundException,
} from 'src/common/exceptions/card-label.exception';

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
    const card = await this.cardRepository.findOne({
      where: { id: cardId },
      relations: ['list', 'list.board'],
    });

    if (!card || !card.list || !card.list.board) {
      throw new CardNotFoundException();
    }

    const boardId = card.list.board.id;

    // 보드 멤버 검증 (예외 발생)
    await this.isUserMember(userId, boardId);

    // Label 존재 여부 확인
    const label = await this.labelRepository.findOneBy({ id: labelId });
    if (!label) {
      throw new LabelNotFoundException();
    }
    try {
      const cardLabel = this.cardLabelRepository.create({ cardId, labelId });
      return await this.cardLabelRepository.save(cardLabel);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new CardLabelConflictException();
      }
      throw new CardLabelInternalServerErrorException();
    }
  }

  async findAll(userId: number, cardId: number) {
    const card = await this.cardRepository.findOne({
      where: { id: cardId },
      relations: ['list', 'list.board'],
    });

    if (!card || !card.list || !card.list.board) {
      throw new CardLabelNotFoundException();
    }

    const boardId = card.list.board.id;

    // 보드 멤버 확인
    await this.isUserMember(userId, boardId); // 예외 발생 시 catch로 이동
    try {
      return await this.cardLabelRepository.find({
        where: { cardId: cardId },
      });
    } catch (err) {
      throw new CardLabelInternalServerErrorException();
    }
  }

  //지정 라벨 업데이트
  async update(userId: number, cardId: number, labelId: number, id: number) {
    const card = await this.cardRepository.findOne({
      where: { id: cardId },
      relations: ['list', 'list.board'],
    });

    if (!card || !card.list || !card.list.board) {
      throw new CardNotFoundException();
    }

    const boardId = card.list.board.id;

    // 보드 멤버 검증 (예외 발생)
    await this.isUserMember(userId, boardId);
    const cardLabel = await this.cardLabelRepository.findOneBy({
      id: id,
    });
    if (!cardLabel) {
      throw new CardLabelNotFoundException();
    }
    const label = await this.labelRepository.findOneBy({ id: labelId });
    if (!label) {
      throw new LabelNotFoundException();
    }
    try {
      // 업데이트 진행
      Object.assign(cardLabel, { cardId: cardId, labelId: labelId });
      return await this.cardLabelRepository.save(cardLabel);
    } catch (err) {
      throw new CardLabelConflictException();
    }
  }

  async remove(id: number) {
    const cardLabel = await this.cardLabelRepository.findOneBy({ id });
    if (!cardLabel) {
      throw new LabelNotFoundException();
    }

    await this.cardLabelRepository.delete(id);
    return `지정 라벨을 삭제하였습니다.`;
  }

  async isUserMember(userId: number, boardId: number): Promise<void> {
    const member = await this.memberRepository.findOne({
      where: { userId, boardId },
    });

    if (!member) {
      throw new BoardMembersForbiddenException();
    }
  }
}

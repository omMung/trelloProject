import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { List } from '../lists/entities/list.entity';
import { Card } from '../cards/entities/card.entity';
import { Member } from '../members/entities/member.entity';
import { visibEnum } from './dto/visibility.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';




@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    @InjectRepository(List) private listRepository: Repository<List>,
    @InjectRepository(Card) private cardRepository: Repository<Card>,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  // 보드 생성
  async create(userId: number, createBoardDto: CreateBoardDto) {
    const { title, visibility, color } = createBoardDto;
    const colorRegex = /^(#([0-9A-F]{3}){1,2})$/i;

    if (!colorRegex.test(color)) {
      throw new BadRequestException('유효하지 않은 색상 코드입니다. 올바른 형식(#RRGGBB)을 사용해 주세요.');
    }

    try {
      const newBoard = this.boardRepository.create({
        userId,
        title,
        visibility,
        color,
      });

      const result = await this.boardRepository.save(newBoard);

      const member = this.memberRepository.create({
        userId,
        boardId: result.id,
      });
      await this.memberRepository.save(member);

      return { message: '보드를 성공적으로 생성했습니다.' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new NotFoundException('보드 생성에 에러가 발생했습니다.');
    }
  }

  // 보드 전체 조회
  async findAll(userId: number) {
    try {
      const allBoards = await this.boardRepository.find({
        where: [{ visibility: visibEnum.PUBLIC }, { userId }],
        select: ['id', 'visibility', 'color', 'title'],
      });

      return {
        message: '모든 보드를 성공적으로 조회했습니다.',
        data: allBoards,
      };
    } catch (error) {
      throw new NotFoundException('보드 전체 조회 중에 에러가 발생했습니다.');
    }
  }

  // 보드 상세 조회
  async findOne(userId: number, id: number) {
    try {
      const board = await this.boardRepository.findOne({
        where: [{ visibility: visibEnum.PUBLIC, id }, { userId, id }],
        select: ['id', 'visibility', 'color', 'title'],
      });

      if (!board) {
        throw new NotFoundException('해당 보드를 찾을 수 없습니다.');
      }

      const lists = await this.listRepository.find({
        where: { boardId: id },
        select: ['id', 'position', 'title'],
      });

      if (lists.length === 0) {
        throw new NotFoundException('보드 안에 리스트를 찾을 수 없습니다.');
      }

      const listIds = lists.map(list => list.id);

      const cards = await this.cardRepository.find({
        where: { listId: In(listIds) },
        select: ['id', 'listId', 'title', 'position', 'color', 'description'],
      });

      if (cards.length === 0) {
        throw new NotFoundException('리스트 안에 카드를 찾을 수 없습니다.');
      }

      const listsWithCards = lists.map(list => {
        const cardsInList = cards.filter(card => card.listId === list.id);
        return {
          ...list,
          cards: cardsInList,
        };
      });

      return {
        message: '하나의 보드를 성공적으로 조회했습니다.',
        data: {
          ...board,
          lists: listsWithCards,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('보드 상세 조회 중에 에러가 발생했습니다.');
    }
  }

  // 보드 수정
  async update(userId: number, id: number, updateBoardDto: UpdateBoardDto) {
    const { title, visibility, color } = updateBoardDto;

    try {
      const board = await this.boardRepository.findOne({ where: { id, userId } });

      if (!board) {
        throw new NotFoundException('보드를 찾을 수 없습니다.');
      }

      await this.boardRepository.update({ id, userId }, {
        title,
        visibility,
        color,
      });

      const updatedBoard = await this.boardRepository.findOne({ where: { id, userId } });

      if (!updatedBoard) {
        throw new NotFoundException('새로 업데이트한 보드를 찾을 수 없습니다.');
      }

      return {
        message: '보드를 성공적으로 수정했습니다.',
        data: updatedBoard,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('보드 수정에 에러가 발생했습니다.');
    }
  }

  // 보드 삭제
  async remove(userId: number, id: number) {
    try {
      const board = await this.boardRepository.findOne({ where: { id, userId } });

      if (!board) {
        throw new NotFoundException('삭제할 보드를 찾을 수 없습니다.');
      }

      await this.boardRepository.remove(board);

      return { message: '보드를 성공적으로 삭제했습니다.' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('보드 삭제에 에러가 발생했습니다.');
    }
  }
}

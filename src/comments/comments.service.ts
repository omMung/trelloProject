import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Member } from 'src/members/entities/member.entity';
import { Comment } from './entities/comment.entity';
import { List } from '../lists/entities/list.entity';
import { Card } from 'src/cards/entities/card.entity';
import {
  CommentNotFoundException,
  CommentPermissionException,
  EmptyCommentException,
  CommentLengthExceededException,
} from 'src/common/exceptions/comment.exception';
import { User } from 'src/users/entities/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  private async getBoardMembersByBoardId(
    boardId: number,
    userId: number, // ✅ userId를 인자로 받아 req 의존성 제거
  ): Promise<{ user: User; members: number[] }> {
    // 요청한 userId가 존재하는지 검증
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('유저 정보를 찾을 수 없습니다.');
    }

    // 보드 ID로 멤버 ID 리스트 조회
    const members = await this.membersRepository.find({
      where: { boardId },
      select: ['userId'],
    });

    if (!members.length) {
      throw new NotFoundException('해당 보드에 소속된 멤버가 없습니다.');
    }

    // 현재 API 호출한 유저 정보 + 보드 멤버 ID 목록 반환
    return { user, members: members.map((m) => m.userId) };
  }

  private async getBoardMembersByCardId(
    cardId: number,
    userId: number,
  ): Promise<{ user: User; members: number[] }> {
    // 카드가 존재하는지 확인 및 카드가 속한 리스트 조회
    const card = await this.cardsRepository.findOne({
      where: { id: cardId },
      relations: ['list'],
    });
    if (!card) {
      throw new NotFoundException('해당 카드를 찾을 수 없습니다.');
    }

    // 리스트를 통해 보드 ID 추출
    const boardId = card.list.boardId;

    // 보드 ID를 기반으로 보드 멤버 조회 (중복 로직 제거)
    return this.getBoardMembersByBoardId(boardId, userId);
  }

  // 생성 시 카드 id를 파라미터로
  async createComment(cardId: number, userId: number, content: string) {
    if (_.isEmpty(content.trim())) {
      throw new EmptyCommentException();
    }

    if (content.length > 50) {
      throw new CommentLengthExceededException();
    }

    const newComment = this.commentRepository.create({
      cardId,
      userId,
      content,
    });

    const savedComment = await this.commentRepository.save(newComment);

    // 📢 알람 발생
    const { user, members } = await this.getBoardMembersByCardId(
      cardId,
      userId,
    );
    this.eventEmitter.emit('comment.created', {
      senderId: user.id,
      cardId,
      members: members.filter((id) => id !== user.id),
      message: `(${user.name})님이 새로운 댓글을 작성했습니다.`,
    });

    return savedComment;
  }

  async getCommentByCardId(cardId: number) {
    return await this.commentRepository.findBy({
      cardId: cardId,
    });
  }

  async getCommentById(id: number) {
    const comment = await this.commentRepository.findOneBy({ id });

    if (_.isNil(comment)) {
      throw new CommentNotFoundException();
    }

    return comment;
  }

  async updateComment(id: number, userId: number, content: string) {
    if (_.isEmpty(content.trim())) {
      throw new EmptyCommentException();
    }

    if (content.length > 50) {
      throw new CommentLengthExceededException();
    }

    await this.verifyComment(id, userId);
    await this.commentRepository.update({ id }, { content });

    const updatedComment = await this.commentRepository.findOneBy({ id });

    // 알람 발생
    const { user, members } = await this.getBoardMembersByCardId(
      updatedComment.cardId,
      userId,
    );
    this.eventEmitter.emit('comment.updated', {
      senderId: user.id,
      cardId: updatedComment.cardId,
      members: members.filter((id) => id !== user.id),
      message: `(${user.name})님이 댓글을 수정했습니다.`,
    });

    return updatedComment;
  }

  async deleteComment(id: number, userId: number) {
    const comment = await this.commentRepository.findOneBy({ id });
    if (!comment) {
      throw new CommentNotFoundException();
    }

    await this.verifyComment(id, userId);
    await this.commentRepository.delete({ id });

    // 알람 발생
    const { user, members } = await this.getBoardMembersByCardId(
      comment.cardId,
      userId,
    );
    this.eventEmitter.emit('comment.deleted', {
      senderId: user.id,
      cardId: comment.cardId,
      members: members.filter((id) => id !== user.id),
      message: `(${user.name})님이 댓글을 삭제했습니다.`,
    });

    return { id, message: '삭제되었습니다.' };
  }

  private async verifyComment(id: number, userId: number) {
    const comment = await this.commentRepository.findOneBy({ id });

    if (_.isNil(comment) || comment.userId !== userId) {
      throw new CommentPermissionException();
    }
  }
}

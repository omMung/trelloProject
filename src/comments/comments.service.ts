import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';

import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async createComment(cardId: number, userId: number, content: string) {
    if (_.isEmpty(content.trim())) {
      throw new BadRequestException('댓글 내용을 비울 수 없습니다.');
    }

    if (content.length > 50) {
      throw new BadRequestException('댓글 내용은 50자를 넘길 수 없습니다.');
    }

    const newComment = this.commentRepository.create({
      cardId,
      userId,
      content,
    });
    return await this.commentRepository.save(newComment);
  }

  async getCommentByCardId(cardId: number) {
    return await this.commentRepository.findBy({
      cardId: cardId,
    });
  }

  async getCommentById(id: number) {
    const comment = await this.commentRepository.findOneBy({ id });
    if (_.isNil(comment)) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }
    return comment;
  }

  async updateComment(id: number, userId: number, content: string) {
    if (_.isEmpty(content.trim())) {
      throw new BadRequestException('댓글 내용을 비울 수 없습니다.');
    }

    if (content.length > 50) {
      throw new BadRequestException('댓글 내용은 50자를 넘길 수 없습니다.');
    }
    await this.verifyComment(id, userId);
    await this.commentRepository.update({ id }, { content });
    return await this.commentRepository.findOneBy({ id });
  }

  async deleteComment(id: number, userId: number) {
    await this.verifyComment(id, userId);
    await this.commentRepository.delete({ id });
    return { id, message: '삭제되었습니다.' };
  }

  private async verifyComment(id: number, userId: number) {
    const comment = await this.commentRepository.findOneBy({
      id,
    });

    if (_.isNil(comment) || comment.userId !== userId) {
      throw new NotFoundException(
        '댓글을 찾을 수 없거나 수정/삭제할 권한이 없습니다.',
      );
    }
  }
}

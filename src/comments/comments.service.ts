import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';

import { Comment } from './entities/comment.entity';
import {
  CommentNotFoundException,
  CommentPermissionException,
  EmptyCommentException,
  CommentLengthExceededException,
} from 'src/common/exceptions/comment.exception';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

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

    return await this.commentRepository.findOneBy({ id });
  }

  async deleteComment(id: number, userId: number) {
    await this.verifyComment(id, userId);
    await this.commentRepository.delete({ id });

    return { id, message: '삭제되었습니다.' };
  }

  private async verifyComment(id: number, userId: number) {
    const comment = await this.commentRepository.findOneBy({ id });

    if (_.isNil(comment) || comment.userId !== userId) {
      throw new CommentPermissionException();
    }
  }
}

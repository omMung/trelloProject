import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
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
    await this.commentRepository.save({
      cardId: cardId,
      userId: userId,
      content: content,
    });
  }
  async getCommentByCardId(cardId: number) {
    return await this.commentRepository.findBy({
      cardId: cardId,
    });
  }

  // async getCommentById(id: number) {
  //   const comment = await this.commentRepository.findOneBy({ id });
  //   if (_.isNil(comment)) {
  //     throw new NotFoundException('댓글을 찾을 수 없습니다.');
  //   }
  //   return comment;
  // }

  async updateComment(id: number, userId: number, content: string) {
    await this.verifyComment(id, userId);
    await this.commentRepository.update({ id }, { content });
  }

  async deleteComment(id: number, userId: number) {
    await this.verifyComment(id, userId);
    await this.commentRepository.delete({ id });
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

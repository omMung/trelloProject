import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
// import { userInfo } from 'os'; 유저 엔티티에서 정보를 가져와야 한다.

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':cardId')
  async createComment(
    // @userInfo() user: User,
    @Param('cardId') cardId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const comment = await this.commentsService.createComment(
      cardId,
      1,
      createCommentDto.content,
    );
    return { data: comment };
    // await this.commentsService.createComment(cardId, createCommentDto.content, user.id);
  }

  @Get(':cardId')
  async findAllComment(@Param('cardId') cardId: number) {
    const comments = await this.commentsService.getCommentByCardId(cardId);
    return { data: comments };
  }

  // @Get(':id/detail')
  // async findOneComment(@Param('id') id: number) {
  //   return await this.commentsService.getCommentById(+id);
  // }

  @Patch(':id')
  async updateComment(
    // @userInfo() user: User,
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const comment = await this.commentsService.updateComment(
      +id,
      1,
      updateCommentDto.content,
    ); //user.id
    return { data: comment };
  }

  @Delete(':id')
  async deleteComment(
    // @userInfo() user: User,
    @Param('id') id: number,
  ) {
    const comment = await this.commentsService.deleteComment(+id, 1);
    return { data: comment };
  }
}

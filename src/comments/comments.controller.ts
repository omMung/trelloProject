import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':cardId')
  async createComment(
    @Request() req,
    @Param('cardId') cardId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const user = req.user; // JwtAuthGuard에서 설정된 user 정보
    const comment = await this.commentsService.createComment(
      cardId,
      user.id,
      createCommentDto.content,
    );
    return { data: comment };
  }

  @Get(':cardId')
  async findAllComment(@Param('cardId') cardId: number) {
    const comments = await this.commentsService.getCommentByCardId(cardId);
    return { data: comments };
  }

  @Get(':id/detail')
  async findOneComment(@Param('id') id: number) {
    return await this.commentsService.getCommentById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateComment(
    @Request() req,
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const user = req.user;
    const comment = await this.commentsService.updateComment(
      +id,
      user.id,
      updateCommentDto.content,
    );
    return { data: comment };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteComment(@Request() req, @Param('id') id: number) {
    const user = req.user;
    const comment = await this.commentsService.deleteComment(+id, user.id);
    return { data: comment };
  }
}

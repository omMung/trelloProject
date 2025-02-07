import {
  Request,
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CardMembersService } from './card-members.service';
import { CreateCardMemberDto } from './dto/create-card-member.dto';
import { UpdateCardMemberDto } from './dto/update-card-member.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('card-members')
export class CardMembersController {
  constructor(private readonly cardMembersService: CardMembersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createCardMemberDto: CreateCardMemberDto) {
    const authId = req.user.id;
    const { userId, cardId } = createCardMemberDto;
    return this.cardMembersService.create(authId, userId, cardId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req, @Body() body: { cardId: number }) {
    const authId = req.user.id;
    const cardId = body.cardId;
    return this.cardMembersService.findAll(authId, cardId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Request() req,
    @Body() body: { cardId: number },
    @Param('id') userId: string,
  ) {
    const authId = req.user.id;
    const cardId = body.cardId;
    return this.cardMembersService.remove(authId, cardId, +userId);
  }
}

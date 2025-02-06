import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { UpdateCardPositionsDto } from './dto/update-card-positions.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FindCardDto } from './dto/find-card.dto';
import { DeleteCardDto } from './dto/delete-card.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCard(@Request() req, @Body() createCardDto: CreateCardDto) {
    return await this.cardsService.createCard(req, createCardDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Body() findCardDto: FindCardDto) {
    return this.cardsService.findOne(+id, findCardDto);
  }

  @Patch(':id')
  updateCard(
    @Request() req,
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardsService.updateCard(req, +id, updateCardDto);
  }

  @Delete(':id')
  deleteCard(
    @Request() req,
    @Param('id') id: string,
    @Body() deleteCardDto: DeleteCardDto,
  ) {
    return this.cardsService.deleteCard(req, +id, deleteCardDto);
  }

  // 카드 위치 업데이트
  @Patch()
  async updatePositions(
    @Body() UpdateCardPositionsDto: UpdateCardPositionsDto,
  ): Promise<{ message: string }> {
    // 반환 타입 명시
    await this.cardsService.updatePositions(UpdateCardPositionsDto);
    return { message: '카드 위치가 성공적으로 업데이트되었습니다.' };
  }
}

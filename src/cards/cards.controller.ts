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

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCard(@Request() req, @Body() createCardDto: CreateCardDto) {
    return await this.cardsService.createCard(req, createCardDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Body() createCardDto: CreateCardDto) {
    return this.cardsService.findOne(+id, createCardDto);
  }

  @Patch(':id')
  updateCard(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.updateCard(+id, updateCardDto);
  }

  @Delete(':id')
  deleteCard(@Param('id') id: string) {
    return this.cardsService.deleteCard(+id);
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

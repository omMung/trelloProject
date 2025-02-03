import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { UpdateCardPositionsDto } from './dto/update-card-positions.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async createCard(@Body() createCardDto: CreateCardDto) {
    return await this.cardsService.createCard(createCardDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Body() listId: number) {
    return this.cardsService.findOne(+id, listId);
  }

  @Patch(':id')
  updateCard(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.updateCard(+id, updateCardDto);
  }

  @Delete(':id')
  deleteCard(@Param('id') id: string, @Body('list_id') listId: number) {
    return this.cardsService.deleteCard(+id, listId);
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

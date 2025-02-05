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
import { CardLabelsService } from './card-labels.service';
import { CreateCardLabelDto } from './dto/create-card-label.dto';
import { UpdateCardLabelDto } from './dto/update-card-label.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('/card-labels')
export class CardLabelsController {
  constructor(private readonly cardLabelsService: CardLabelsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createCardLabelDto: CreateCardLabelDto) {
    const user = req.user;
    const { cardId, labelId } = createCardLabelDto;
    return this.cardLabelsService.create(user.id, cardId, labelId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Body() boardId: number, @Request() req) {
    const user = req.user;
    return this.cardLabelsService.findAll(user.id, boardId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCardLabelDto: UpdateCardLabelDto,
    @Request() req,
  ) {
    const user = req.user;
    const { cardId, labelId } = updateCardLabelDto;
    return this.cardLabelsService.update(+id, cardId, labelId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardLabelsService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CardLabelsService } from './card-labels.service';
import { CreateCardLabelDto } from './dto/create-card-label.dto';
import { UpdateCardLabelDto } from './dto/update-card-label.dto';

@Controller('/card-labels')
export class CardLabelsController {
  constructor(private readonly cardLabelsService: CardLabelsService) {}

  @Post()
  create(@Body() createCardLabelDto: CreateCardLabelDto) {
    return this.cardLabelsService.create(createCardLabelDto);
  }

  @Get()
  findAll() {
    return this.cardLabelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardLabelsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCardLabelDto: UpdateCardLabelDto,
  ) {
    return this.cardLabelsService.update(+id, updateCardLabelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardLabelsService.remove(+id);
  }
}

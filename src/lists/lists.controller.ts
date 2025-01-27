// src/lists/lists.controller.ts
import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { UpdateListPositionsDto } from './dto/update-list-positions.dto';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  // 리스트 생성
  @Post()
  async create(@Body() createListDto: CreateListDto) {
    return this.listsService.create(createListDto);
  }

  //특정 리스트 업데이트
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listsService.update(+id, updateListDto);
  }

  //특정 리스트 삭제
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.listsService.remove(+id);
  }

  // 리스트 위치 업데이트
  @Patch()
  async updatePositions(
    @Body() updateListPositionsDto: UpdateListPositionsDto,
  ) {
    return this.listsService.updatePositions(updateListPositionsDto);
  }
}

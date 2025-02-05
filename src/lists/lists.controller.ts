// src/lists/lists.controller.ts
import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { UpdateListPositionsDto } from './dto/update-list-positions.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  // 리스트 생성
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createListDto: CreateListDto, @Request() req) {
    return this.listsService.create(createListDto, req);
  }

  //특정 리스트 업데이트
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateListDto: UpdateListDto,
    @Request() req,
  ) {
    return this.listsService.update(+id, updateListDto, req);
  }

  //특정 리스트 삭제
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Body() updateListDto: UpdateListDto,
    @Request() req,
  ) {
    return this.listsService.remove(+id, updateListDto, req);
  }

  // 리스트 위치 업데이트
  @UseGuards(JwtAuthGuard)
  @Patch()
  async updatePositions(
    @Body() updateListPositionsDto: UpdateListPositionsDto,
    @Request() req,
  ): Promise<{ message: string }> {
    // 반환 타입 명시
    await this.listsService.updatePositions(updateListPositionsDto, req);
    return { message: '리스트 위치가 성공적으로 업데이트되었습니다.' };
  }
}

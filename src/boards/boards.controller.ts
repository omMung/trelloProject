import { Controller, Get, Post, Body, Patch, Param, Delete , UseGuards , Request } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @UseGuards(JwtAuthGuard)
  @Post() // 보드 생성
  create(@Request() req ,@Body() createBoardDto: CreateBoardDto) {
    const userId = req.user.id
    return this.boardsService.create(userId , createBoardDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get() // 보드 전체 조회
  findAll() {
    return this.boardsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id') // 보드 상세 조회
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id') // 보드 수정
  update(@Request() req , @Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    const userId = req.user.id
    return this.boardsService.update(userId,+id, updateBoardDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id') // 보드 삭제
  remove(@Request() req , @Param('id') id: string) {
    const userId = req.user.id
    return this.boardsService.remove(userId,+id);
  }
}

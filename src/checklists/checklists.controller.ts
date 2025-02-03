import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChecklistsService } from './checklists.service';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';
import { CheckList } from './entities/checklist.entity';

@Controller('checklists')
export class ChecklistsController {
  constructor(private readonly checklistsService: ChecklistsService) {}

  @Post()
  async create(
    @Body() createChecklistDto: CreateChecklistDto,
  ): Promise<CheckList> {
    return this.checklistsService.create(createChecklistDto);
  }

  @Get()
  async findAll(@Body() cardId: number): Promise<CheckList[]> {
    //카드아이디가 로그인 중인 유저의 카드에 해당하는지 검증
    return this.checklistsService.findAllByCardId(cardId); // 서비스에서 유저 ID로 체크리스트 조회
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.checklistsService.findOne(+id);
  // }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateChecklistDto: UpdateChecklistDto,
  ): Promise<CheckList> {
    return this.checklistsService.update(id, updateChecklistDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @Body() updateChecklistDto: UpdateChecklistDto,
  ): Promise<void> {
    return this.checklistsService.remove(id, updateChecklistDto);
  }
}

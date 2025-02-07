import {
  Controller,
  Get,
  Post,
  Body,
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
  async findAll(@Body() UpdateChecklistDto: UpdateChecklistDto) {
    return await this.checklistsService.findAllByCardId(UpdateChecklistDto); // 서비스에서 카드 ID로 체크리스트 조회
  }

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

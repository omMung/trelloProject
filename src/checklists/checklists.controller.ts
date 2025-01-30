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
import { request } from 'http';
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

  // @Get()
  // findAll(/*@Body() request: request.user.id*/) {
  //   return this.checklistsService.findAll();
  // }

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
  async remove(@Param('id') id: number): Promise<void> {
    return this.checklistsService.remove(id);
  }
}

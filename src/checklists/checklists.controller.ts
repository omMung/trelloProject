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

@Controller('checklists')
export class ChecklistsController {
  constructor(private readonly checklistsService: ChecklistsService) {}

  @Post()
  create(@Body() createChecklistDto: CreateChecklistDto) {
    return this.checklistsService.create(createChecklistDto);
  }

  @Get()
  findAll(/*@Body() request: request.user.id*/) {
    return this.checklistsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.checklistsService.findOne(+id);
  // }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateChecklistDto: UpdateChecklistDto,
  ) {
    return this.checklistsService.update(+id, updateChecklistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.checklistsService.remove(+id);
  }
}

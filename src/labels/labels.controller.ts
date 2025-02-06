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
import { LabelsService } from './labels.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('/labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createLabelDto: CreateLabelDto) {
    const user = req.user;
    const { title, color, boardId } = createLabelDto;
    return this.labelsService.create(user.id, title, color, boardId);
  }

  @Get()
  findAll() {
    return this.labelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLabelDto: UpdateLabelDto) {
    return this.labelsService.update(+id, updateLabelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labelsService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CheckitemsService } from './checkitems.service';
import { CreateCheckitemDto } from './dto/create-checkitem.dto';
import { UpdateCheckitemDto } from './dto/update-checkitem.dto';
import { CheckItem } from './entities/checkitem.entity';

@Controller('checkitems')
export class CheckitemsController {
  constructor(private readonly checkitemsService: CheckitemsService) {}

  @Post()
  async create(
    @Body() createCheckitemDto: CreateCheckitemDto,
  ): Promise<CheckItem> {
    return this.checkitemsService.create(createCheckitemDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCheckitemDto: UpdateCheckitemDto,
  ): Promise<CheckItem> {
    return this.checkitemsService.update(id, updateCheckitemDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @Body() UpdateCheckitemDto: UpdateCheckitemDto,
  ): Promise<void> {
    return this.checkitemsService.remove(id, UpdateCheckitemDto);
  }
}

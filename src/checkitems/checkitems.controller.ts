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

  // @Get()
  // findAll() {
  //   return this.checkitemsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.checkitemsService.findOne(+id);
  // }

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
    @Body() CheckListId: number,
  ): Promise<void> {
    return this.checkitemsService.remove(id, CheckListId);
  }
}

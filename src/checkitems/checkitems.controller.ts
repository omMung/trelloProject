import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CheckitemsService } from './checkitems.service';
import { CreateCheckitemDto } from './dto/create-checkitem.dto';
import { UpdateCheckitemDto } from './dto/update-checkitem.dto';

@Controller('checkitems')
export class CheckitemsController {
  constructor(private readonly checkitemsService: CheckitemsService) {}

  @Post()
  create(@Body() createCheckitemDto: CreateCheckitemDto) {
    return this.checkitemsService.create(createCheckitemDto);
  }

  @Get()
  findAll() {
    return this.checkitemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkitemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckitemDto: UpdateCheckitemDto) {
    return this.checkitemsService.update(+id, updateCheckitemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkitemsService.remove(+id);
  }
}

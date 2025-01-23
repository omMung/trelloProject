import { Injectable } from '@nestjs/common';
import { CreateCheckitemDto } from './dto/create-checkitem.dto';
import { UpdateCheckitemDto } from './dto/update-checkitem.dto';

@Injectable()
export class CheckitemsService {
  create(createCheckitemDto: CreateCheckitemDto) {
    return 'This action adds a new checkitem';
  }

  findAll() {
    return `This action returns all checkitems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkitem`;
  }

  update(id: number, updateCheckitemDto: UpdateCheckitemDto) {
    return `This action updates a #${id} checkitem`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkitem`;
  }
}

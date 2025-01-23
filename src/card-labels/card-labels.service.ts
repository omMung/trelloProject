import { Injectable } from '@nestjs/common';
import { CreateCardLabelDto } from './dto/create-card-label.dto';
import { UpdateCardLabelDto } from './dto/update-card-label.dto';

@Injectable()
export class CardLabelsService {
  create(createCardLabelDto: CreateCardLabelDto) {
    return 'This action adds a new cardLabel';
  }

  findAll() {
    return `This action returns all cardLabels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cardLabel`;
  }

  update(id: number, updateCardLabelDto: UpdateCardLabelDto) {
    return `This action updates a #${id} cardLabel`;
  }

  remove(id: number) {
    return `This action removes a #${id} cardLabel`;
  }
}

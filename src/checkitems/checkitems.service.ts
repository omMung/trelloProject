import { Injectable } from '@nestjs/common';
import { CreateCheckitemDto } from './dto/create-checkitem.dto';
import { UpdateCheckitemDto } from './dto/update-checkitem.dto';
import { CheckItem } from './entities/checkitem.entity';

@Injectable()
export class CheckitemsService {
  private checkitems: CheckItem[] = []; // 임시 저장소

  create(createCheckitemDto: CreateCheckitemDto): CheckItem {
    const newCheckitem = new CheckItem();
    newCheckitem.checkListId = createCheckitemDto.checkListId;
    newCheckitem.title = createCheckitemDto.title;
    this.checkitems.push(newCheckitem);
    return newCheckitem;
  }

  // findAll() {
  //   return `This action returns all checkitems`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} checkitem`;
  // }

  // 항목 업데이트 메서드
  update(id: number, updateCheckitemDto: UpdateCheckitemDto): CheckItem {
    const checkitem = this.checkitems.find((item) => item.id === id); // ID로 항목 찾기
    if (!checkitem) {
      throw new Error('Checkitem not found'); // 에러 처리
    }

    // 업데이트
    if (updateCheckitemDto.title !== undefined) {
      checkitem.title = updateCheckitemDto.title;
    }
    if (updateCheckitemDto.status !== undefined) {
      checkitem.status = updateCheckitemDto.status;
    }
    if (updateCheckitemDto.position !== undefined) {
      checkitem.position = updateCheckitemDto.position;
    }
    if (updateCheckitemDto.memberId !== undefined) {
      checkitem.memberId = updateCheckitemDto.memberId;
    }

    return checkitem;
  }

  remove(id: number) {
    return `This action removes a #${id} checkitem`;
  }
}

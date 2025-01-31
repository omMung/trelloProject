import { Injectable } from '@nestjs/common';
import { CreateCheckitemDto } from './dto/create-checkitem.dto';
import { UpdateCheckitemDto } from './dto/update-checkitem.dto';
import { CheckItem } from './entities/checkitem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CheckitemsService {
  //private checkitems: CheckItem[] = []; // 임시 저장소
  constructor(
    @InjectRepository(CheckItem)
    private checkitemsRepository: Repository<CheckItem>,
  ) {}

  create(createCheckitemDto: CreateCheckitemDto): Promise<CheckItem> {
    // const newCheckitem = new CheckItem();
    // newCheckitem.checkListId = createCheckitemDto.checkListId;
    // newCheckitem.title = createCheckitemDto.title;
    const newCheckitem = this.checkitemsRepository.create(createCheckitemDto);
    return this.checkitemsRepository.save(newCheckitem);
  }

  // findAll() {
  //   return `This action returns all checkitems`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} checkitem`;
  // }

  // 항목 업데이트 메서드
  async update(
    id: number,
    updateCheckitemDto: UpdateCheckitemDto,
  ): Promise<CheckItem> {
    const checkitem = await this.checkitemsRepository.findOneBy({ id }); // ID로 항목 찾기
    if (!checkitem) {
      throw new Error('체크리스트 항목을 찾을 수 없습니다.'); // 에러 처리
    }

    // 업데이트
    // if (updateCheckitemDto.title !== undefined) {
    //   checkitem.title = updateCheckitemDto.title;
    // }
    // if (updateCheckitemDto.status !== undefined) {
    //   checkitem.status = updateCheckitemDto.status;
    // }
    // if (updateCheckitemDto.position !== undefined) {
    //   checkitem.position = updateCheckitemDto.position;
    // }
    // if (updateCheckitemDto.memberId !== undefined) {
    //   checkitem.memberId = updateCheckitemDto.memberId;
    // }

    // return checkitem;
    // 업데이트
    Object.assign(checkitem, updateCheckitemDto);
    return this.checkitemsRepository.save(checkitem); // 업데이트된 항목 저장
  }

  // 항목 삭제 메서드
  async remove(checkListId: number): Promise<void> {
    // const index = this.checkitemsRepository.findIndex(
    //   (item) => item.checkListId === checkListId,
    // ); // ID로 항목 찾기
    // if (index === -1) {
    //   throw new Error('Checkitem not found'); // 에러 처리
    // }
    // this.checkitemsRepository.splice(index, 1); // 항목 삭제
    const checkitem = await this.checkitemsRepository.findOneBy({
      checkListId,
    });

    if (!checkitem) {
      throw new Error('Checkitem not found'); // 에러 처리
    }

    await this.checkitemsRepository.remove(checkitem); // 항목 삭제
  }
}

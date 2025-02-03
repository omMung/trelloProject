import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
    try {
      const newCheckitem = this.checkitemsRepository.create(createCheckitemDto);
      return this.checkitemsRepository.save(newCheckitem);
    } catch (err) {
      throw new InternalServerErrorException('서버에 오류가 발생하였습니다.');
    }
  }

  // 항목 업데이트 메서드
  async update(
    id: number,
    updateCheckitemDto: UpdateCheckitemDto,
  ): Promise<CheckItem> {
    try {
      //카드id 검증 필요
      //멤버id 검증 필요
      const checkitem = await this.checkitemsRepository.findOneBy({ id }); // ID로 항목 찾기
      if (!checkitem) {
        throw new Error('체크리스트 항목을 찾을 수 없습니다.'); // 에러 처리
      }

      Object.assign(checkitem, updateCheckitemDto);
      return this.checkitemsRepository.save(checkitem); // 업데이트된 항목 저장
    } catch (err) {
      throw new InternalServerErrorException('서버에 오류가 발생하였습니다.');
    }
  }

  // 항목 삭제 메서드
  async remove(id: number, checkListId: number): Promise<void> {
    try {
      const checkitem = await this.checkitemsRepository.findOneBy({
        id,
      });

      if (!checkitem) {
        throw new Error('항목이 없어용.'); // 에러 처리
      }

      await this.checkitemsRepository.remove(checkitem); // 항목 삭제
    } catch (err) {
      throw new InternalServerErrorException('서버에 오류가 발생하였습니다.');
    }
  }
}

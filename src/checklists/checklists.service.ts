import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';
import { CheckList } from './entities/checklist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChecklistsService {
  // private checkLists: CheckList[] = []; // 임시 저장소
  constructor(
    @InjectRepository(CheckList)
    private checkitemsRepository: Repository<CheckList>,
  ) {}

  // 체크리스트 생성 메서드
  async create(createChecklistDto: CreateChecklistDto): Promise<CheckList> {
    // const newChecklist = new CheckList();
    // newChecklist.cardId = createChecklistDto.cardId;
    // newChecklist.title = createChecklistDto.title;
    // this.checkitemsRepository.push(newChecklist);
    // return newChecklist;
    const newChecklist = this.checkitemsRepository.create(createChecklistDto);
    return await this.checkitemsRepository.save(newChecklist);
  }

  // 체크리스트 업데이트 메서드
  async update(
    id: number,
    updateChecklistDto: UpdateChecklistDto,
  ): Promise<CheckList> {
    // const checklist = this.checkitemsRepository.find((item) => item.id === id); // ID로 체크리스트 찾기
    // if (!checklist) {
    //   throw new Error('체크리스트를 찾을 수 없습니다.'); // 에러 처리
    // }

    // // 업데이트
    // if (updateChecklistDto.title !== undefined) {
    //   checklist.title = updateChecklistDto.title;
    // }
    // if (updateChecklistDto.position !== undefined) {
    //   checklist.position = updateChecklistDto.position;
    // }

    // return checklist;
    const checklist = await this.checkitemsRepository.findOneBy({ id }); // ID로 체크리스트 찾기
    if (!checklist) {
      throw new NotFoundException('체크리스트를 찾을 수 없습니다.'); // 에러 처리
    }

    // 업데이트
    Object.assign(checklist, updateChecklistDto);
    return await this.checkitemsRepository.save(checklist);
  }

  // 카드 ID로 체크리스트 삭제 메서드
  async remove(cardId: number): Promise<void> {
    // const index = this.checkitemsRepository.findIndex(
    //   (item) => item.cardId === cardId,
    // ); // 카드 ID로 체크리스트 찾기
    // if (index === -1) {
    //   throw new Error('이 아이디에 해당하는 체크리스트가 없어용.'); // 에러 처리
    // }
    // this.checkitemsRepository.splice(index, 1); // 체크리스트 삭제
    const result = await this.checkitemsRepository.delete({ cardId }); // 카드 ID로 체크리스트 삭제
    if (result.affected === 0) {
      throw new NotFoundException('이 아이디에 해당하는 체크리스트가 없어용.'); // 에러 처리
    }
  }
}

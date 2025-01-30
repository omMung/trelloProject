import { Injectable } from '@nestjs/common';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';
import { CheckList } from './entities/checklist.entity';

@Injectable()
export class ChecklistsService {
  private checkLists: CheckList[] = []; // 임시 저장소

  // 체크리스트 생성 메서드
  create(createChecklistDto: CreateChecklistDto): CheckList {
    const newChecklist = new CheckList();
    newChecklist.cardId = createChecklistDto.cardId;
    newChecklist.title = createChecklistDto.title;
    this.checkLists.push(newChecklist);
    return newChecklist;
  }

  // 체크리스트 업데이트 메서드
  update(id: number, updateChecklistDto: UpdateChecklistDto): CheckList {
    const checklist = this.checkLists.find((item) => item.id === id); // ID로 체크리스트 찾기
    if (!checklist) {
      throw new Error('체크리스트를 찾을 수 없습니다.'); // 에러 처리
    }

    // 업데이트
    if (updateChecklistDto.title !== undefined) {
      checklist.title = updateChecklistDto.title;
    }
    if (updateChecklistDto.position !== undefined) {
      checklist.position = updateChecklistDto.position;
    }

    return checklist;
  }

  // 카드 ID로 체크리스트 삭제 메서드
  remove(cardId: number): void {
    const index = this.checkLists.findIndex((item) => item.cardId === cardId); // 카드 ID로 체크리스트 찾기
    if (index === -1) {
      throw new Error('이 아이디에 해당하는 체크리스트가 없어용.'); // 에러 처리
    }
    this.checkLists.splice(index, 1); // 체크리스트 삭제
  }
}

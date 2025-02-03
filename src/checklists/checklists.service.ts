import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    private checklistRepository: Repository<CheckList>,
  ) {}

  // 체크리스트 생성 메서드
  async create(createChecklistDto: CreateChecklistDto): Promise<CheckList> {
    try {
      const { cardId, title } = createChecklistDto;
      const cards = await this.checklistRepository.find({
        where: { cardId },
        select: ['position'],
      });
      // 최대 포지션 찾기
      const maxPosition =
        cards.length > 0 ? Math.max(...cards.map((list) => list.position)) : 0;

      const newChecklist = this.checklistRepository.create({
        cardId,
        title,
        position: maxPosition + 1,
      });
      return await this.checklistRepository.save(newChecklist);
    } catch (err) {
      throw new InternalServerErrorException('서버에 오류가 발생하였습니다.');
    }
  }

  //체크리스트 조회 메서드
  async findAllByCardId(cardId: number): Promise<CheckList[]> {
    return this.checklistRepository.find({ where: { cardId } });
  }

  // 체크리스트 업데이트 메서드
  async update(
    id: number,
    updateChecklistDto: UpdateChecklistDto,
  ): Promise<CheckList> {
    try {
      const checklist = await this.checklistRepository.findOneBy({ id }); // ID로 체크리스트 찾기
      if (!checklist) {
        throw new NotFoundException('체크리스트를 찾을 수 없습니다.'); // 에러 처리
      }
      //카드id 검증 필요

      // 업데이트
      Object.assign(checklist, updateChecklistDto);
      return await this.checklistRepository.save(checklist);
    } catch (err) {
      throw new InternalServerErrorException('서버에 오류가 발생하였습니다.');
    }
  }

  // 체크리스트 삭제 메서드
  async remove(
    id: number,
    updateChecklistDto: UpdateChecklistDto,
  ): Promise<void> {
    try {
      const { cardId } = updateChecklistDto;
      //카드id 검증 필요

      const result = await this.checklistRepository.delete({ id }); // 카드 ID로 체크리스트 삭제
      if (result.affected === 0) {
        throw new NotFoundException(
          '이 아이디에 해당하는 체크리스트가 없어용.',
        ); // 에러 처리
      }
    } catch (err) {
      throw new InternalServerErrorException('서버에 오류가 발생하였습니다.');
    }
  }
}

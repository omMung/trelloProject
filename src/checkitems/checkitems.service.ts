import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCheckitemDto } from './dto/create-checkitem.dto';
import { UpdateCheckitemDto } from './dto/update-checkitem.dto';
import { CheckItem } from './entities/checkitem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChecklistsService } from 'src/checklists/checklists.service';

@Injectable()
export class CheckitemsService {
  constructor(
    @InjectRepository(CheckItem)
    private checkitemsRepository: Repository<CheckItem>,
    private checklistsService: ChecklistsService, // ChecklistsService 주입
  ) {}

  async create(createCheckitemDto: CreateCheckitemDto): Promise<CheckItem> {
    try {
      const { checkListId, title } = createCheckitemDto;

      // 체크리스트 ID 검증
      const checkListExists = await this.checklistsService.exists(checkListId);
      if (!checkListExists) {
        throw new NotFoundException('존재하지 않는 체크리스트입니다.');
      }
      const checkitems = await this.checkitemsRepository.find({
        where: { checkListId },
        select: ['position'],
      });

      // 최대 포지션 찾기
      const maxPosition =
        checkitems.length > 0
          ? Math.max(...checkitems.map((list) => list.position))
          : 0;

      const newCheckitem = this.checkitemsRepository.create({
        checkListId,
        title,
        position: maxPosition + 1,
      });
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
    const { checklistId, title, status, position, memberId } =
      updateCheckitemDto;
    try {
      const checkitem = await this.checkitemsRepository.findOneBy({ id }); // ID로 체크리스트 찾기
      if (!checkitem) {
        throw new NotFoundException('체크리스트 항목을 찾을 수 없습니다.'); // 에러 처리
      }
      //체크리스트 id 검증
      if (checkitem.checkListId !== checklistId) {
        throw new BadRequestException('체크리스트의 ID가 일치하지 않습니다.');
      }
      //멤버id 검증 필요

      Object.assign(checkitem, updateCheckitemDto);
      return this.checkitemsRepository.save(checkitem); // 업데이트된 항목 저장
    } catch (err) {
      throw new InternalServerErrorException('서버에 오류가 발생하였습니다.');
    }
  }

  // 항목 삭제 메서드
  async remove(
    id: number,
    updateCheckitemDto: UpdateCheckitemDto,
  ): Promise<void> {
    const { checklistId } = updateCheckitemDto;
    try {
      const checkitem = await this.checkitemsRepository.findOneBy({
        id,
      });

      if (!checkitem) {
        throw new NotFoundException('항목이 없어용.'); // 에러 처리
      }

      //체크리스트 id 검증
      if (checkitem.checkListId !== checklistId) {
        throw new BadRequestException('체크리스트의 ID가 일치하지 않습니다.');
      }

      await this.checkitemsRepository.remove(checkitem); // 항목 삭제
    } catch (err) {
      throw new InternalServerErrorException('서버에 오류가 발생하였습니다.');
    }
  }
}

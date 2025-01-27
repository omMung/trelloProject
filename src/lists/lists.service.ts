// src/lists/lists.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { UpdateListPositionsDto } from './dto/update-list-positions.dto';

@Injectable() // 주입 가능
export class ListsService {
  constructor(
    @InjectRepository(List)
    private listsRepository: Repository<List>,
  ) {}

  async create(createListDto: CreateListDto): Promise<List> {
    const { boardId, title } = createListDto;

    // 보드 id로 리스트 조회
    const lists = await this.listsRepository.find({
      where: { boardId },
      select: ['position'],
    });
    // const lists = [
    //   { position: 1 },
    //   { position: 2 },
    //   { position: 3 },
    // ];

    // 최대 포지션 찾기
    const maxPosition =
      lists.length > 0 ? Math.max(...lists.map((list) => list.position)) : 0;
    // 1. 맵 함수를 통해 position 값만 추출한 새로운 배열 생성
    // 2. Math.max(...arrays) : 배열의 모든 요소는 개별 인자로 전달, 그중 최대값 구함
    // 3. 삼항연상자 형태 >> 배열 길이가 0이라면 >> 아직 리스트가 없다면 maxPosition은 0
    // 배열 길이가 0 이상이라면 >> 기존 리스트가 있다면 maxPosition은 배열 중 position 최대값

    // maxPosition에 +1 하여 최종 포지션 결정
    const newPosition = maxPosition + 1;

    // 리스트 엔티티 생성
    const list = this.listsRepository.create({
      boardId,
      position: newPosition,
      title,
    });

    // 리스트 저장 및 반환
    return this.listsRepository.save(list);
  }

  // 리스트 업데이트(파라미터로 id 받음)
  async update(id: number, updateListDto: UpdateListDto): Promise<List> {
    const list = await this.listsRepository.findOne({ where: { id } });

    if (!list) {
      throw new NotFoundException(`리스트를 찾을 수 없습니다.`);
    }

    const { title } = updateListDto;

    // title 업데이트가 있는 경우
    if (title !== undefined) {
      list.title = title;
    }

    return this.listsRepository.save(list);
  }

  // 특정 리스트 삭제(파라미터로 id 받음)
  async remove(id: number): Promise<void> {
    const list = await this.listsRepository.findOne({ where: { id } });

    if (!list) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }

    await this.listsRepository.remove(list);
  }

  // 위치 변경 업데이트
  // 포지션은 무조선 1부터 시작, 연속적으로 존재해야함.
  // ex) 1,2,3,4 >> O , 1,2,4 >> X
  async updatePositions(
    updateListPositionsDto: UpdateListPositionsDto,
  ): Promise<void> {
    const { boardId, lists } = updateListPositionsDto;
    // const lists = [
    // { "id": 1, "position": 1 },
    // { "id": 2, "position": 2 },
    // { "id": 3, "position": 3 }
    // ];

    // 보드 id로 리스트 조회
    const DBLists = await this.listsRepository.find({
      where: { boardId },
      select: ['id', 'position'],
    });

    // 검증 1: 클라이언트 전송 리스트, 실제 보드에 속한 리스트 수 비교 검증
    if (lists.length !== DBLists.length) {
      throw new BadRequestException(
        '전송된 리스트의 수가 보드에 속한 리스트의 수와 일치하지 않습니다.',
      );
    }

    // 검증 2: 클라이언트 제공 리스트 ID가 실제로 지정된 보드에 속해있는지 검증
    // DBLists 배열의 list 객체에서 id만 추출하여 새로운 배열 생성
    const DBIds = DBLists.map((list) => list.id);
    // lists(클라이언트가 전달한) 배열의 list 객체에서 id만 추출하여 새로운 배열 생성
    const providedIds = lists.map((list) => list.id);
    // array.every() = 배열의 모든 요소가 조건을 만족하는지 확인하여 만족 시 T or F 반환
    // Array.includes() = 배열에 특정 요소가 포함되어 있는지 확인하여 존재 시 T or F 반환
    // providedIds의 모든 id가 DBIds의 id에 포함되는지 전부 확인 >> allIdsMatch
    const allIdsMatch = providedIds.every((id) => DBIds.includes(id));

    if (!allIdsMatch) {
      throw new BadRequestException(
        '일부 리스트 ID가 지정된 보드에 속해 있지 않습니다.',
      );
    }

    // 검증 3: 포지션 순서 확인 (1, 2, 3, ...)
    // 포지션이 1부터 시작하여 연속적인지 확인
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].position !== i + 1) {
        throw new BadRequestException('잘못된 요청입니다');
      }
    }

    // 위치 업데이트
    const updatePromises = lists.map((list) =>
      this.listsRepository.update(list.id, { position: list.position }),
    );

    await Promise.all(updatePromises);
  }
}

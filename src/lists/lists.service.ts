// src/lists/lists.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { Member } from '../members/entities/member.entity';
import { User } from '../users/entities/user.entity';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { UpdateListPositionsDto } from './dto/update-list-positions.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
// import { getConnection } from 'typeorm';

@Injectable() // 주입 가능
export class ListsService {
  constructor(
    @InjectRepository(List)
    private listsRepository: Repository<List>,
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private readonly eventEmitter: EventEmitter2, // 이벤트 발생기 추가
  ) {}

  // dto로 받은 boardId, jwt인증 성공 시 req에 포함되어 있는 id(User)로
  // 존재하는 유저인지, 그 유저가 현재 보드 멤버에 포함되어 있는지 검증하는 함수
  private async validateUserAndMember(
    req: any,
    boardId: number,
  ): Promise<{ user: User; members: number[] }> {
    const userId = req.user.id;

    // 유저 존재 검증
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('유저 정보가 없습니다.');
    }

    // 보드에 속한 멤버인지 검증
    const member = await this.membersRepository.findOne({
      where: { userId, boardId },
    });
    if (!member) {
      throw new NotFoundException(
        '해당 보드에 소속된 멤버 정보가 존재하지 않습니다.',
      );
    }

    // 해당 보드의 모든 멤버 조회
    const members = await this.membersRepository.find({
      where: { boardId },
      select: ['userId'], // 멤버 ID만 가져오기
    });

    if (!members.length) {
      throw new NotFoundException('해당 보드에 소속된 멤버가 없습니다.');
    }

    // 모든 멤버의 ID 배열 생성
    const memberIds = members.map((member) => member.userId);

    return { user, members: memberIds }; // 유저 정보 + 보드 멤버 ID 목록 반환
  }

  async create(createListDto: CreateListDto, req: any): Promise<List> {
    const { boardId, title } = createListDto;
    const { user, members } = await this.validateUserAndMember(req, boardId);

    console.log('리스트 생성 요청 받음:', { boardId, title, user, members });

    const existingList = await this.listsRepository.findOne({
      where: { boardId, title },
    });
    if (existingList) {
      throw new BadRequestException('같은 제목의 리스트가 이미 존재합니다.');
    }

    const lists = await this.listsRepository.find({
      where: { boardId },
      select: ['position'],
    });
    const maxPosition =
      lists.length > 0 ? Math.max(...lists.map((list) => list.position)) : 0;
    const newPosition = maxPosition + 1;

    const list = this.listsRepository.create({
      boardId,
      position: newPosition,
      title,
    });
    const savedList = await this.listsRepository.save(list);

    console.log('리스트 생성 완료:', savedList);

    // 이벤트 발생
    const emitResult = this.eventEmitter.emit('list.created', {
      senderId: user.id,
      boardId,
      members,
      message: `(${user.name})님이 새로운 리스트를 생성하였습니다.`,
    });

    console.log('@@@@@@@@@@에미터 호출 확인', emitResult);

    // 이벤트 발생 로그 추가
    console.log('list.created 이벤트 발생:', {
      senderId: user.id,
      boardId,
      members,
      message: `(${user.name})님이 새로운 리스트를 생성하였습니다.`,
    });

    return savedList;
  }

  // 리스트 업데이트(파라미터로 id 받음)
  async update(
    id: number,
    updateListDto: UpdateListDto,
    req: any,
  ): Promise<List> {
    const { boardId } = updateListDto;

    await this.validateUserAndMember(req, boardId);

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
  async remove(
    id: number,
    updateListDto: UpdateListDto,
    req: any,
  ): Promise<void> {
    const { boardId } = updateListDto;

    await this.validateUserAndMember(req, boardId);

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
    req: any,
  ): Promise<void> {
    const { boardId, lists } = updateListPositionsDto;
    // const lists = [
    // { "id": 1, "position": 1 },
    // { "id": 2, "position": 2 },
    // { "id": 3, "position": 3 }
    // ];
    await this.validateUserAndMember(req, boardId);

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

    const updatePromises = lists.map((list) => {
      console.log(list);
      return this.listsRepository.update(list.id, { position: list.position });
    });

    await Promise.all(updatePromises);
  }
}

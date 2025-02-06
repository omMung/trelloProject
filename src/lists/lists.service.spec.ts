// src/lists/lists.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ListsService } from './lists.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Member } from '../members/entities/member.entity';
import { User } from '../users/entities/user.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('ListsService', () => {
  let service: ListsService;

  // 모의 Repository 생성
  const mockListRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockMemberRepository = {
    findOne: jest.fn(),
  };

  const mockUserRepository = {
    findOne: jest.fn(),
  };

  // 공통으로 사용할 dummy req 객체 (유저 id: 1)
  const dummyReq = { user: { id: 1 } };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListsService,
        {
          provide: getRepositoryToken(List),
          useValue: mockListRepository,
        },
        {
          provide: getRepositoryToken(Member),
          useValue: mockMemberRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<ListsService>(ListsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // --- create 메서드 테스트 ---
  describe('create', () => {
    it('리스트 생성 테스트', async () => {
      const createListDto = { boardId: 1, title: 'New List' };

      // 유저와 멤버 검증: findOne이 각각 유효한 객체 반환
      mockUserRepository.findOne.mockResolvedValue({ id: 1 });
      mockMemberRepository.findOne.mockResolvedValue({ id: 1, boardId: 1 });

      // 1. find 메서드가 빈 배열(리스트 없음)을 반환한다고 가정
      mockListRepository.find.mockResolvedValue([]);

      // 2. Repository.create는 주어진 인자로 새 객체를 반환
      const createdList = { boardId: 1, title: 'New List', position: 1 };
      mockListRepository.create.mockReturnValue(createdList);

      // 3. save 메서드 호출 시, id가 부여된 객체를 반환하도록 설정
      mockListRepository.save.mockResolvedValue({ id: 1, ...createdList });

      const result = await service.create(createListDto, dummyReq);

      // 검증: 보드 id 조건으로 find 호출
      expect(mockListRepository.find).toHaveBeenCalledWith({
        where: { boardId: createListDto.boardId },
        select: ['position'],
      });
      // 검증: create가 새 객체를 올바른 인자로 생성했는지
      expect(mockListRepository.create).toHaveBeenCalledWith({
        boardId: createListDto.boardId,
        title: createListDto.title,
        position: 1,
      });
      // 검증: save가 생성된 객체를 저장하는지
      expect(mockListRepository.save).toHaveBeenCalledWith(createdList);
      // 최종 반환 결과 확인
      expect(result).toEqual({ id: 1, ...createdList });
    });

    it('같은 제목의 리스트가 존재하면 BadRequestException 발생', async () => {
      const createListDto = { boardId: 1, title: 'Duplicate List' };

      // 유저와 멤버 검증 통과
      mockUserRepository.findOne.mockResolvedValue({ id: 1 });
      mockMemberRepository.findOne.mockResolvedValue({ id: 1, boardId: 1 });

      // 이미 같은 제목의 리스트가 존재한다고 가정
      mockListRepository.findOne.mockResolvedValue({
        id: 2,
        boardId: 1,
        title: 'Duplicate List',
        position: 1,
      });

      await expect(service.create(createListDto, dummyReq)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  // --- update 메서드 테스트 ---
  describe('update', () => {
    it('리스트 업데이트 테스트', async () => {
      const updateListDto = { boardId: 1, title: 'Updated List' };
      const listFromDb = { id: 1, boardId: 1, title: 'Old List', position: 1 };

      // 유저/멤버 검증 통과
      mockUserRepository.findOne.mockResolvedValue({ id: 1 });
      mockMemberRepository.findOne.mockResolvedValue({ id: 1, boardId: 1 });

      // findOne이 기존 리스트를 반환하도록 설정
      mockListRepository.findOne.mockResolvedValue(listFromDb);

      // save가 업데이트된 리스트를 반환하도록 설정
      const updatedList = { ...listFromDb, title: updateListDto.title };
      mockListRepository.save.mockResolvedValue(updatedList);

      const result = await service.update(1, updateListDto, dummyReq);

      // findOne이 id 기준으로 호출되었는지 확인
      expect(mockListRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      // save 호출시 리스트가 올바르게 업데이트되었는지 확인
      expect(mockListRepository.save).toHaveBeenCalledWith(updatedList);
      expect(result).toEqual(updatedList);
    });

    it('리스트가 없으면 NotFoundException 발생', async () => {
      // 유저/멤버 검증 통과
      mockUserRepository.findOne.mockResolvedValue({ id: 1 });
      mockMemberRepository.findOne.mockResolvedValue({ id: 1, boardId: 1 });

      // findOne이 null 반환 (리스트가 없음을 가정)
      mockListRepository.findOne.mockResolvedValue(null);

      await expect(
        service.update(1, { boardId: 1, title: 'Test' }, dummyReq),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // --- remove 메서드 테스트 ---
  describe('remove', () => {
    it('리스트 삭제 테스트', async () => {
      const listFromDb = { id: 1, boardId: 1, title: 'List', position: 1 };

      // 유저/멤버 검증 통과
      mockUserRepository.findOne.mockResolvedValue({ id: 1 });
      mockMemberRepository.findOne.mockResolvedValue({ id: 1, boardId: 1 });

      // findOne이 리스트를 반환하도록 설정
      mockListRepository.findOne.mockResolvedValue(listFromDb);
      // remove는 삭제 후 undefined를 반환하도록 설정
      mockListRepository.remove.mockResolvedValue(undefined);

      const result = await service.remove(1, { boardId: 1 }, dummyReq);

      expect(mockListRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockListRepository.remove).toHaveBeenCalledWith(listFromDb);
      expect(result).toBeUndefined();
    });

    it('리스트가 없으면 NotFoundException 발생', async () => {
      // 유저/멤버 검증 통과
      mockUserRepository.findOne.mockResolvedValue({ id: 1 });
      mockMemberRepository.findOne.mockResolvedValue({ id: 1, boardId: 1 });

      mockListRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(1, { boardId: 1 }, dummyReq)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // --- updatePositions 메서드 테스트 ---
  describe('updatePositions', () => {
    it('리스트 포지션 업데이트 테스트', async () => {
      const updateListPositionsDto = {
        boardId: 1,
        lists: [
          { id: 3, position: 1 },
          { id: 1, position: 2 },
          { id: 2, position: 3 },
        ],
      };

      // 유저/멤버 검증 통과
      mockUserRepository.findOne.mockResolvedValue({ id: 1 });
      mockMemberRepository.findOne.mockResolvedValue({ id: 1, boardId: 1 });

      // DB에서 조회되는 리스트 (순서는 상관없음)
      const dbLists = [
        { id: 1, position: 1 },
        { id: 2, position: 2 },
        { id: 3, position: 3 },
      ];
      mockListRepository.find.mockResolvedValue(dbLists);
      // update는 각 호출마다 빈 객체 반환 (또는 결과값 없이)
      mockListRepository.update.mockResolvedValue({});

      await service.updatePositions(updateListPositionsDto, dummyReq);

      // find가 boardId 기준으로 호출되었는지 확인
      expect(mockListRepository.find).toHaveBeenCalledWith({
        where: { boardId: updateListPositionsDto.boardId },
        select: ['id', 'position'],
      });
      // update가 3번 호출되어 각 리스트에 대해 실행되었는지 확인
      expect(mockListRepository.update).toHaveBeenCalledTimes(3);
      updateListPositionsDto.lists.forEach((list) => {
        expect(mockListRepository.update).toHaveBeenCalledWith(list.id, {
          position: list.position,
        });
      });
    });

    it('전달값과 DB 값의 리스트 수 불일치 시 BadRequestException 발생', async () => {
      const updateListPositionsDto = {
        boardId: 1,
        lists: [
          { id: 1, position: 1 },
          { id: 2, position: 2 },
        ],
      };

      // DB에는 3개의 리스트가 있다고 가정
      const dbLists = [
        { id: 1, position: 1 },
        { id: 2, position: 2 },
        { id: 3, position: 3 },
      ];
      mockListRepository.find.mockResolvedValue(dbLists);

      await expect(
        service.updatePositions(updateListPositionsDto, dummyReq),
      ).rejects.toThrow(BadRequestException);
    });

    it('전달된 리스트 ID가 DB에 없으면 BadRequestException 발생', async () => {
      const updateListPositionsDto = {
        boardId: 1,
        lists: [
          { id: 1, position: 1 },
          { id: 99, position: 2 }, // 존재하지 않는 id
          { id: 3, position: 3 },
        ],
      };

      // DB에는 id 1, 2, 3만 존재한다고 가정
      const dbLists = [
        { id: 1, position: 1 },
        { id: 2, position: 2 },
        { id: 3, position: 3 },
      ];
      mockListRepository.find.mockResolvedValue(dbLists);

      await expect(
        service.updatePositions(updateListPositionsDto, dummyReq),
      ).rejects.toThrow(BadRequestException);
    });

    it('전달된 리스트의 포지션 순서가 불연속이면 BadRequestException 발생', async () => {
      const updateListPositionsDto = {
        boardId: 1,
        lists: [
          { id: 1, position: 1 },
          { id: 2, position: 3 }, // 순서가 틀림 (2번 리스트는 position 2여야 함)
          { id: 3, position: 2 },
        ],
      };

      // DB에서 조회되는 리스트 (ID는 일치하는 것으로 가정)
      const dbLists = [
        { id: 1, position: 1 },
        { id: 2, position: 2 },
        { id: 3, position: 3 },
      ];
      mockListRepository.find.mockResolvedValue(dbLists);

      await expect(
        service.updatePositions(updateListPositionsDto, dummyReq),
      ).rejects.toThrow(BadRequestException);
    });
  });
});

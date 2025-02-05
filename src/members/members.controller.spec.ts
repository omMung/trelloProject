import { Test, TestingModule } from '@nestjs/testing';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

describe('MembersController', () => {
  let controller: MembersController;
  let service: MembersService;

  // MembersService의 가짜(mock) 객체를 생성하여 테스트에서 사용
  const mockMembersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };


  // 각 테스트 실행 전 설정
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembersController],
      providers: [
        {
          provide: MembersService,
          useValue: mockMembersService,
        },
      ],
    })
    .overrideGuard(JwtAuthGuard) // JwtAuthGuard를 비활성화하여 인증을 우회
    .useValue({ canActivate: () => true }) // 인증을 항상 통과하도록 설정
    .compile();

    controller = module.get<MembersController>(MembersController);
    service = module.get<MembersService>(MembersService);
  });

  // 컨트롤러가 정상적으로 정의되어 있어야 한다.
  it('컨트롤러가 정의되어 있어야 한다.', () => {
    expect(controller).toBeDefined();
  });

  // 멤버 생성 API 테스트
  describe('멤버 생성', () => {
    it('멤버를 성공적으로 생성할 수 있어야 한다.', async () => {
      const result = { message: 'Trello 보드(1)에 유저(1) 등록 성공', data: [{ name: 'User 1', email: 'user1@example.com' }] };
      mockMembersService.create.mockResolvedValue(result);

      expect(await controller.create({ user: { id: 1 } }, { boardId: 1, userId: 1 })).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(1, { boardId: 1, userId: 1 });
    });

    it('보드가 존재하지 않을 경우 NotFoundException이 발생해야 한다.', async () => {
      mockMembersService.create.mockRejectedValue(new NotFoundException('해당 보드 Id 값을 찾을수 없습니다'));

      await expect(controller.create({ user: { id: 1 } }, { boardId: 999, userId: 1 }))
        .rejects
        .toThrow(NotFoundException);
    });
  });

  // 모든 멤버 조회 API 테스트
  describe('모든 멤버 조회', () => {
    it('멤버들을 성공적으로 조회할 수 있어야 한다.', async () => {
      const result = { message: 'Trello 보드(1)에 멤버 조회 성공', names: [{ name: 'User 1' }, { name: 'User 2' }] };
      mockMembersService.findAll.mockResolvedValue(result);

      expect(await controller.findAll({ boardId: 1 })).toEqual(result);
      expect(service.findAll).toHaveBeenCalledWith({"boardId": 1});
    });

    it('보드에 해당하는 멤버가 없을 경우 Error가 발생해야 한다.', async () => {
      mockMembersService.findAll.mockRejectedValue(new Error('보드에 해당하는 유저를 찾을수가 없습니다'));

      await expect(controller.findAll({ boardId: 999 }))
        .rejects
        .toThrow(Error);
    });
  });

  // 멤버 상세 조회 API 테스트
  describe('멤버 상세 조회', () => {
    it('멤버를 성공적으로 상세 조회할 수 있어야 한다.', async () => {
      const result = { message: 'Trello 보드(1)에 멤버(1) 상세 조회 성공', data: { name: 'User 1', email: 'user1@example.com', phoneNumber: '010-1234-5678' } };
      mockMembersService.findOne.mockResolvedValue(result);

      expect(await controller.findOne('1', { boardId: 1 })).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(1, { boardId: 1 });
    });

    it('보드에 해당하는 멤버가 없을 경우 Error가 발생해야 한다.', async () => {
      mockMembersService.findOne.mockRejectedValue(new Error('보드에 해당하는 유저를 찾을수가 없습니다'));

      await expect(controller.findOne('999', { boardId: 1 }))
        .rejects
        .toThrow(Error);
    });
  });

  // 멤버 삭제 API 테스트
  describe('멤버 삭제', () => {
    it('멤버를 성공적으로 삭제할 수 있어야 한다.', async () => {
      const result = { message: "Trello 보드(1)에 멤버 'User 1' (1) 삭제 성공" };
      mockMembersService.remove.mockResolvedValue(result);

      expect(await controller.remove({ user: { id: 1 } }, { boardId: 1, userId: 1 })).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith(1, { boardId: 1, userId: 1 });
    });

    it('삭제할 멤버가 존재하지 않을 경우 NotFoundException이 발생해야 한다.', async () => {
      mockMembersService.remove.mockRejectedValue(new NotFoundException('보드안에 해당 멤버를 찾을수 없습니다'));

      await expect(controller.remove({ user: { id: 1 } }, { boardId: 999, userId: 1 }))
        .rejects
        .toThrow(NotFoundException);
    });
  });
});

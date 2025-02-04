import { Test, TestingModule } from '@nestjs/testing';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('MembersController', () => {
  let membersController: MembersController;
  let membersService: MembersService;

  const mockMembersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembersController],
      providers: [
        { provide: MembersService, useValue: mockMembersService },
      ],
    }).compile();

    membersController = module.get<MembersController>(MembersController);
    membersService = module.get<MembersService>(MembersService);
  });

  describe('create', () => {
    test('멤버를 성공적으로 생성할 수 있어야 한다', async () => {
      const result = { message: 'Trello 보드(1)에 유저(1) 등록 성공', data: [{ name: 'User 1', email: 'user1@example.com' }] };
      mockMembersService.create.mockResolvedValue(result);

      expect(await membersController.create({ user: { id: 1 } }, { boardId: 1 })).toEqual(result);
    });

    test('보드가 존재하지 않을 경우 NotFoundException이 발생해야 한다', async () => {
      mockMembersService.create.mockRejectedValue(new NotFoundException('해당 보드 Id 값을 찾을수 없습니다'));
      
      await expect(membersController.create({ user: { id: 1 } }, { boardId: 999 }))
        .rejects
        .toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    test('멤버들을 성공적으로 조회할 수 있어야 한다', async () => {
      const result = { message: 'Trello 보드(1)에 멤버 조회 성공', names: [{ name: 'User 1' }, { name: 'User 2' }] };
      mockMembersService.findAll.mockResolvedValue(result);

      expect(await membersController.findAll({ boardId: 1 })).toEqual(result);
    });

    test('보드에 해당하는 멤버가 없을 경우 Error가 발생해야 한다', async () => {
      mockMembersService.findAll.mockRejectedValue(new Error('보드에 해당하는 유저를 찾을수가 없습니다'));
      
      await expect(membersController.findAll({ boardId: 999 }))
        .rejects
        .toThrow(Error);
    });
  });

  describe('findOne', () => {
    test('멤버를 성공적으로 상세 조회할 수 있어야 한다', async () => {
      const result = { message: 'Trello 보드(1)에 멤버(1) 상세 조회 성공', data: { name: 'User 1', email: 'user1@example.com', phoneNumber: '010-1234-5678' } };
      mockMembersService.findOne.mockResolvedValue(result);
  
      // 인자값을 두 개로 수정
      expect(await membersController.findOne('1', { boardId: 1 })).toEqual(result);
    });
  
    test('보드에 해당하는 멤버가 없을 경우 Error가 발생해야 한다', async () => {
      mockMembersService.findOne.mockRejectedValue(new Error('보드에 해당하는 유저를 찾을수가 없습니다'));
  
      // 인자값을 두 개로 수정
      await expect(membersController.findOne('999', { boardId: 1 }))
        .rejects
        .toThrow(Error);
    });
  });
  

  describe('remove', () => {
    test('멤버를 성공적으로 삭제할 수 있어야 한다', async () => {
      const result = { message: "Trello 보드(1)에 멤버 'User 1' (1) 삭제 성공" };
      mockMembersService.remove.mockResolvedValue(result);

      expect(await membersController.remove({ user: { id: 1 } }, { boardId: 1 })).toEqual(result);
    });

    test('삭제할 멤버가 존재하지 않을 경우 NotFoundException이 발생해야 한다', async () => {
      mockMembersService.remove.mockRejectedValue(new NotFoundException('보드안에 해당 멤버를 찾을수 없습니다'));
      
      await expect(membersController.remove({ user: { id: 1 } }, { boardId: 999 }))
        .rejects
        .toThrow(NotFoundException);
    });
  });
});

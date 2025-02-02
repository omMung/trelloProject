import { Test, TestingModule } from '@nestjs/testing';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { GetMemberDto } from './dto/get-member.dto';

describe('MembersController', () => {
  let controller: MembersController;
  let service: MembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembersController],
      providers: [
        {
          provide: MembersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MembersController>(MembersController);
    service = module.get<MembersService>(MembersService);
  });

  describe('create', () => {
    test('멤버가 정상적으로 생성 되어야 함', async () => {
      const createMemberDto: CreateMemberDto = { userId: 1, boardId: 1 };
      const result = { message: 'Trello 보드(1)에 유저(1) 등록 성공', data: [{ name: 'User 1' }] };

     
      service.create = jest.fn().mockResolvedValue(result);

      expect(await controller.create(createMemberDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    test('조회가 되어야함', async () => {
      const getMemberDto: GetMemberDto = { boardId: 1 };
      const result = { message: 'Trello 보드(1)에  멤버 조회 성공', names: [{ name: 'User 1' }] };

      
      service.findAll = jest.fn().mockResolvedValue(result);

      expect(await controller.findAll(getMemberDto)).toBe(result);
    });
  });

  describe('findOne', () => {
    test('상세조회가 되어야함', async () => {
      const getMemberDto: GetMemberDto = { boardId: 1 };
      const result = { message: 'Trello 보드(1)에  멤버(1) 상세 조회 성공', data: { name: 'User 1', email: 'user1@example.com' } };

     
      service.findOne = jest.fn().mockResolvedValue(result);

      expect(await controller.findOne('1', getMemberDto)).toBe(result);
    });
  });

  describe('remove', () => {
    test('멤버 삭제가 되어야 함', async () => {
      const getMemberDto: GetMemberDto = { boardId: 1 };
      const result = { message: 'Trello 보드(1)에  멤버 삭제 성공' };

      
      service.remove = jest.fn().mockResolvedValue(result);

      expect(await controller.remove('1', getMemberDto)).toBe(result);
    });
  });
});

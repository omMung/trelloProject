import { Test, TestingModule } from '@nestjs/testing';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { visibEnum } from './dto/visibility.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// BoardsController의 유닛 테스트를 작성하는 블록
describe('BoardsController', () => {
  let controller: BoardsController;
  let service: BoardsService;

  // BoardsService의 가짜(mock) 객체를 생성하여 테스트에서 사용
  const mockBoardsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  // 각 테스트 실행 전 설정
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardsController],
      providers: [
        {
          provide: BoardsService,
          useValue: mockBoardsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard) // JwtAuthGuard를 비활성화하여 인증을 우회
      .useValue({ canActivate: () => true }) // 인증을 항상 통과하도록 설정
      .compile();

    controller = module.get<BoardsController>(BoardsController);
    service = module.get<BoardsService>(BoardsService);
  });

  // 컨트롤러가 정상적으로 정의되어 있어야 한다.
  it('컨트롤러가 정의되어 있어야 한다.', () => {
    expect(controller).toBeDefined();
  });

  // 보드 생성 API 테스트
  describe('보드 생성', () => {
    it('새로운 보드를 생성해야 한다.', async () => {
      const result = { message: '보드를 성공적으로 생성했습니다.' };
      mockBoardsService.create.mockResolvedValue(result);

      // 객체 형태로 전달된 인자 확인
      expect(await controller.create({ user: { id: 1 } }, { title: 'Test', visibility: visibEnum.PUBLIC, color: '#FFFFFF' }),).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(1, { title: 'Test', visibility: visibEnum.PUBLIC, color: '#FFFFFF' });
    });
  });

  // 모든 보드 조회 API 테스트
  describe('모든 보드 조회', () => {
    it('모든 보드를 반환해야 한다.', async () => {
      const result = { message: '모든 보드를 성공적으로 조회했습니다', data: [] };
      mockBoardsService.findAll.mockResolvedValue(result);

      expect(await controller.findAll({ user: { id: 1 } })).toEqual(result);
      expect(service.findAll).toHaveBeenCalledWith(1);
    });
  });

  // 특정 보드 조회 API 테스트
  describe('보드 단건 조회', () => {
    it('하나의 보드를 반환해야 한다.', async () => {
      const result = { message: '하나의 보드를 성공적으로 조회했습니다', data: { id: 1,visibility: visibEnum.PUBLIC, color: '#FFFFFF' , title: 'Test', lists: [] } };
      mockBoardsService.findOne.mockResolvedValue(result);

      expect(await controller.findOne({ user: { id: 1 } }, '1')).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(1, 1);
    });

    it('존재하지 않는 보드일 경우 NotFoundException이 발생해야 한다.', async () => {
      mockBoardsService.findOne.mockRejectedValue(new NotFoundException('해당 보드를 상세 조회 할 수 없습니다.'));
      await expect(controller.findOne({ user: { id: 1 } }, '999')).rejects.toThrow(NotFoundException);
    });
  });

  // 보드 수정 API 테스트
  describe('보드 수정', () => {
    it('보드를 성공적으로 수정해야 한다.', async () => {
      const result = { message: '보드를 성공적으로 수정했습니다', data: { id: 1, visibilit:visibEnum.PRIVATE , color:'#FF1212' ,title: 'Updated Title', createdAt:'2025-02-04T02:18:28.522Z', updatedAt:'2025-02-04T02:19:40.000Z' , userId:11 } };
      mockBoardsService.update.mockResolvedValue(result);

      expect(
        await controller.update({ user: { id: 1 } }, '1', { title: 'Updated Title', visibility: visibEnum.PRIVATE, color: '#FF1212' }),
      ).toEqual(result);

      expect(service.update).toHaveBeenCalledWith(1, 1, { title: 'Updated Title', visibility: visibEnum.PRIVATE, color: '#FF1212' });
    });

    it('수정할 보드를 찾을 수 없을 경우 NotFoundException이 발생해야 한다.', async () => {
      mockBoardsService.update.mockRejectedValue(new NotFoundException('수정할 보드를 찾을 수 없습니다.'));
      await expect(
        controller.update({ user: { id: 1 } }, '999', { title: 'Updated Title', visibility: visibEnum.PUBLIC, color: '#FFFFFF' }),).rejects.toThrow(NotFoundException);
    });
  });

  // 보드 삭제 API 테스트
  describe('보드 삭제', () => {
    it('보드를 성공적으로 삭제해야 한다.', async () => {
      const result = { message: '보드를 성공적으로 삭제했습니다' };
      mockBoardsService.remove.mockResolvedValue(result);

      expect(await controller.remove({ user: { id: 1 } }, '1')).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith(1, 1);
    });

    it('삭제할 보드를 찾을 수 없을 경우 NotFoundException이 발생해야 한다.', async () => {
      mockBoardsService.remove.mockRejectedValue(new NotFoundException('삭제할 보드를 찾을 수 없습니다.'));
      await expect(controller.remove({ user: { id: 1 } }, '999')).rejects.toThrow(NotFoundException);
    });
  });
});

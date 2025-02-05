import { Test, TestingModule } from '@nestjs/testing'; // NestJS의 테스트 모듈을 가져옴
import { CommentsController } from './comments.controller'; // 테스트할 CommentsController 가져옴
import { CommentsService } from './comments.service'; // CommentsController에서 사용할 CommentsService 가져옴
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'; // 인증을 위한 JwtAuthGuard 가져옴
import { CreateCommentDto } from './dto/create-comment.dto'; // 댓글 생성 DTO 가져옴
import { UpdateCommentDto } from './dto/update-comment.dto'; // 댓글 업데이트 DTO 가져옴

// CommentsController의 유닛 테스트를 작성하는 블록
describe('댓글 컨트롤러(CommentsController)', () => {
  let controller: CommentsController; // CommentsController 인스턴스
  let service: CommentsService; // CommentsService 인스턴스

  // CommentsService의 가짜(mock) 객체를 생성하여 테스트에서 사용
  const mockCommentsService = {
    createComment: jest.fn(),
    getCommentByCardId: jest.fn(),
    getCommentById: jest.fn(),
    updateComment: jest.fn(),
    deleteComment: jest.fn(),
  };

  // 각 테스트 실행 전 설정
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        {
          provide: CommentsService,
          useValue: mockCommentsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard) // JwtAuthGuard를 비활성화하여 인증을 우회
      .useValue({ canActivate: () => true }) // 인증을 항상 통과하도록 설정
      .compile();

    controller = module.get<CommentsController>(CommentsController);
    service = module.get<CommentsService>(CommentsService);
  });

  // 컨트롤러가 정상적으로 정의되었는지 확인
  it('컨트롤러가 정의되어 있어야 한다.', () => {
    expect(controller).toBeDefined();
  });

  // 댓글 생성 API 테스트
  describe('댓글 생성', () => {
    it('새로운 댓글을 생성해야 한다.', async () => {
      const dto: CreateCommentDto = { content: '새 댓글' };
      const result = { id: 1, cardId: 1, userId: 1, content: '새 댓글' };

      mockCommentsService.createComment.mockResolvedValue(result);

      expect(
        await controller.createComment({ user: { id: 1 } }, 1, dto),
      ).toEqual({ data: result });

      expect(service.createComment).toHaveBeenCalledWith(1, 1, '새 댓글');
    });
  });

  // 특정 카드에 대한 모든 댓글 조회 테스트
  describe('카드별 댓글 조회', () => {
    it('카드에 달린 모든 댓글을 반환해야 한다.', async () => {
      const result = [{ id: 1, cardId: 1, content: '테스트 댓글' }];
      mockCommentsService.getCommentByCardId.mockResolvedValue(result);

      expect(await controller.findAllComment(1)).toEqual({ data: result });
      expect(service.getCommentByCardId).toHaveBeenCalledWith(1);
    });
  });

  // 특정 ID의 댓글 조회 테스트
  describe('댓글 단건 조회', () => {
    it('특정 ID의 댓글을 반환해야 한다.', async () => {
      const result = { id: 1, cardId: 1, content: '테스트 댓글' };
      mockCommentsService.getCommentById.mockResolvedValue(result);

      expect(await controller.findOneComment(1)).toEqual(result);
      expect(service.getCommentById).toHaveBeenCalledWith(1);
    });
  });

  // 댓글 수정 API 테스트
  describe('댓글 수정', () => {
    it('댓글을 수정해야 한다.', async () => {
      const dto: UpdateCommentDto = { content: '수정된 댓글' };
      const result = { id: 1, userId: 1, content: '수정된 댓글' };

      mockCommentsService.updateComment.mockResolvedValue(result);

      expect(
        await controller.updateComment({ user: { id: 1 } }, 1, dto),
      ).toEqual({ data: result });

      expect(service.updateComment).toHaveBeenCalledWith(1, 1, '수정된 댓글');
    });
  });

  // 댓글 삭제 API 테스트
  describe('댓글 삭제', () => {
    it('댓글을 삭제해야 한다.', async () => {
      const result = { id: 1, userId: 1, deleted: true };
      mockCommentsService.deleteComment.mockResolvedValue(result);

      expect(await controller.deleteComment({ user: { id: 1 } }, 1)).toEqual({
        data: result,
      });

      expect(service.deleteComment).toHaveBeenCalledWith(1, 1);
    });
  });
});

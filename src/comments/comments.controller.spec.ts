import { Test, TestingModule } from '@nestjs/testing'; // NestJS의 테스트 모듈을 가져옴
import { CommentsController } from './comments.controller'; // 테스트할 CommentsController 가져옴
import { CommentsService } from './comments.service'; // CommentsController에서 사용할 CommentsService 가져옴
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'; // 인증을 위한 JwtAuthGuard 가져옴
import { CreateCommentDto } from './dto/create-comment.dto'; // 댓글 생성 DTO 가져옴
import { UpdateCommentDto } from './dto/update-comment.dto'; // 댓글 업데이트 DTO 가져옴

// CommentsController의 유닛 테스트를 작성하는 블록
describe('댓글 컨트롤러(CommentsController)', () => {
  let controller: CommentsController; // CommentsController의 인스턴스를 저장할 변수
  let service: CommentsService; // CommentsService의 인스턴스를 저장할 변수

  // CommentsService의 가짜(mock) 객체를 생성하여 테스트에서 사용
  const mockCommentsService = {
    createComment: jest.fn(), // 댓글 생성 메서드의 mock 함수
    getCommentByCardId: jest.fn(), // 카드 ID로 댓글을 가져오는 메서드의 mock 함수
    getCommentById: jest.fn(), // 특정 ID의 댓글을 가져오는 메서드의 mock 함수
    updateComment: jest.fn(), // 댓글을 업데이트하는 메서드의 mock 함수
    deleteComment: jest.fn(), // 댓글을 삭제하는 메서드의 mock 함수
  };

  // 각 테스트 실행 전에 실행되는 설정
  beforeEach(async () => {
    // NestJS의 테스트 모듈을 생성
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController], // 테스트할 컨트롤러 등록
      providers: [
        {
          provide: CommentsService, // CommentsService를 제공
          useValue: mockCommentsService, // 위에서 만든 mock 객체를 사용
        },
      ],
    })
      .overrideGuard(JwtAuthGuard) // JwtAuthGuard를 비활성화하여 인증을 우회
      .useValue({ canActivate: () => true }) // 인증이 항상 통과되도록 설정
      .compile(); // 테스트 모듈 컴파일

    controller = module.get<CommentsController>(CommentsController); // CommentsController 인스턴스 생성
    service = module.get<CommentsService>(CommentsService); // CommentsService 인스턴스 생성
  });

  // 컨트롤러가 정상적으로 정의되었는지 확인하는 테스트
  it('컨트롤러가 정의되어 있어야 한다.', () => {
    expect(controller).toBeDefined(); // controller가 존재하는지 확인
  });

  // 댓글 생성 API 테스트
  describe('댓글 생성', () => {
    it('새로운 댓글을 생성해야 한다.', async () => {
      const dto: CreateCommentDto = { content: '새 댓글' }; // 댓글 생성 DTO 정의
      const result = { id: 1, cardId: 1, userId: 1, content: '새 댓글' }; // 예상 결과 값

      mockCommentsService.createComment.mockResolvedValue(result); // mock 함수가 위의 결과를 반환하도록 설정

      // 컨트롤러의 createComment 메서드 실행 후 결과 검증
      expect(
        await controller.createComment({ user: { id: 1 } }, 1, dto),
      ).toEqual({ data: result });

      // createComment가 올바른 인자로 호출되었는지 검증
      expect(service.createComment).toHaveBeenCalledWith(1, 1, '새 댓글');
    });
  });

  // 특정 카드에 대한 모든 댓글 조회 테스트
  describe('카드별 댓글 조회', () => {
    it('카드에 달린 모든 댓글을 반환해야 한다.', async () => {
      const result = [{ id: 1, cardId: 1, content: '테스트 댓글' }]; // 예상 반환값 정의
      mockCommentsService.getCommentByCardId.mockResolvedValue(result); // mock 함수가 위의 결과를 반환하도록 설정

      // 컨트롤러의 findAllComment 메서드 실행 후 결과 검증
      expect(await controller.findAllComment(1)).toEqual({ data: result });

      // getCommentByCardId가 올바른 인자로 호출되었는지 검증
      expect(service.getCommentByCardId).toHaveBeenCalledWith(1);
    });
  });

  // 특정 ID의 댓글 조회 테스트
  describe('댓글 단건 조회', () => {
    it('특정 ID의 댓글을 반환해야 한다.', async () => {
      const result = { id: 1, cardId: 1, content: '테스트 댓글' }; // 예상 반환값 정의
      mockCommentsService.getCommentById.mockResolvedValue(result); // mock 함수가 위의 결과를 반환하도록 설정

      // 컨트롤러의 findOneComment 메서드 실행 후 결과 검증
      expect(await controller.findOneComment(1)).toEqual(result);

      // getCommentById가 올바른 인자로 호출되었는지 검증
      expect(service.getCommentById).toHaveBeenCalledWith(1);
    });
  });

  // 댓글 수정 API 테스트
  describe('댓글 수정', () => {
    it('댓글을 수정해야 한다.', async () => {
      const dto: UpdateCommentDto = { content: '수정된 댓글' }; // 댓글 수정 DTO 정의
      const result = { id: 1, userId: 1, content: '수정된 댓글' }; // 예상 결과 값

      mockCommentsService.updateComment.mockResolvedValue(result); // mock 함수가 위의 결과를 반환하도록 설정

      // 컨트롤러의 updateComment 메서드 실행 후 결과 검증
      expect(
        await controller.updateComment({ user: { id: 1 } }, 1, dto),
      ).toEqual({ data: result });

      // updateComment가 올바른 인자로 호출되었는지 검증
      expect(service.updateComment).toHaveBeenCalledWith(1, 1, '수정된 댓글');
    });
  });

  // 댓글 삭제 API 테스트
  describe('댓글 삭제', () => {
    it('댓글을 삭제해야 한다.', async () => {
      const result = { id: 1, userId: 1, deleted: true }; // 예상 결과 값
      mockCommentsService.deleteComment.mockResolvedValue(result); // mock 함수가 위의 결과를 반환하도록 설정

      // 컨트롤러의 deleteComment 메서드 실행 후 결과 검증
      expect(await controller.deleteComment({ user: { id: 1 } }, 1)).toEqual({
        data: result,
      });

      // deleteComment가 올바른 인자로 호출되었는지 검증
      expect(service.deleteComment).toHaveBeenCalledWith(1, 1);
    });
  });
});

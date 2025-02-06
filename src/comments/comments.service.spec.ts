import { Test, TestingModule } from '@nestjs/testing'; // NestJS의 테스트 모듈을 가져옴
import { CommentsService } from './comments.service'; // 테스트할 CommentsService 가져옴
import { getRepositoryToken } from '@nestjs/typeorm'; // TypeORM에서 레포지토리를 주입받기 위한 getRepositoryToken 사용
import { Comment } from './entities/comment.entity'; // 댓글 엔티티(Comment) 가져옴
import {
  CommentNotFoundException,
  CommentPermissionException,
  EmptyCommentException,
  CommentLengthExceededException,
} from 'src/common/exceptions/comment.exception'; // 댓글 관련 예외 가져옴

// CommentsService의 유닛 테스트를 작성하는 블록
describe('댓글 서비스(CommentsService)', () => {
  let service: CommentsService; // CommentsService 인스턴스

  // CommentsService에서 사용할 가짜(mock) 댓글 저장소(repository) 생성
  const mockCommentRepository = {
    create: jest.fn(), // 댓글 생성 함수 mock
    save: jest.fn(), // 댓글 저장 함수 mock
    findBy: jest.fn(), // 여러 개의 댓글을 조회하는 함수 mock
    findOneBy: jest.fn(), // 단일 댓글 조회 함수 mock
    update: jest.fn(), // 댓글 수정 함수 mock
    delete: jest.fn(), // 댓글 삭제 함수 mock
  };

  // 각 테스트 실행 전 초기화 작업 수행
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService, // 테스트할 서비스 주입
        {
          provide: getRepositoryToken(Comment), // Comment 엔티티의 레포지토리 주입
          useValue: mockCommentRepository, // mockCommentRepository를 사용하여 가짜 데이터 주입
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService); // 서비스 인스턴스 가져오기
  });

  // 각 테스트 실행 후 모든 mock을 초기화
  afterEach(() => {
    jest.clearAllMocks();
  });

  // 댓글 생성 테스트
  describe('createComment (댓글 생성)', () => {
    it('댓글을 정상적으로 생성해야 한다.', async () => {
      const cardId = 1;
      const userId = 1;
      const content = 'Test comment'; // 생성할 댓글 내용
      const createdComment = { id: 1, cardId, userId, content }; // 예상 결과

      mockCommentRepository.create.mockReturnValue(createdComment); // mock 데이터 반환 설정
      mockCommentRepository.save.mockResolvedValue(createdComment); // 저장 후 반환할 데이터 설정

      const result = await service.createComment(cardId, userId, content); // 댓글 생성 실행

      expect(mockCommentRepository.create).toHaveBeenCalledWith({
        cardId,
        userId,
        content,
      }); // create 함수가 올바르게 호출되었는지 확인
      expect(mockCommentRepository.save).toHaveBeenCalledWith(createdComment); // save 함수가 올바르게 호출되었는지 확인
      expect(result).toEqual(createdComment); // 결과가 예상과 일치하는지 검증
    });

    it('댓글 내용이 비었을 때 예외가 발생해야 한다.', async () => {
      await expect(service.createComment(1, 1, '')).rejects.toThrow(
        EmptyCommentException,
      ); // 빈 댓글 예외 발생 검증
    });

    it('댓글 내용이 50자를 초과할 경우 예외가 발생해야 한다.', async () => {
      const longContent = 'a'.repeat(51); // 51자 이상 입력
      await expect(service.createComment(1, 1, longContent)).rejects.toThrow(
        CommentLengthExceededException,
      ); // 길이 초과 예외 검증
    });
  });

  // 특정 ID의 댓글 조회 테스트
  describe('getCommentById (댓글 단건 조회)', () => {
    it('ID로 댓글을 조회해야 한다.', async () => {
      const comment = { id: 1, cardId: 1, userId: 1, content: 'Test' }; // 예상되는 댓글 데이터
      mockCommentRepository.findOneBy.mockResolvedValue(comment); // 댓글 조회 mock 데이터 설정

      const result = await service.getCommentById(1); // 댓글 조회 실행

      expect(mockCommentRepository.findOneBy).toHaveBeenCalledWith({ id: 1 }); // findOneBy가 올바르게 호출되었는지 검증
      expect(result).toEqual(comment); // 결과 검증
    });

    it('댓글이 존재하지 않으면 예외가 발생해야 한다.', async () => {
      mockCommentRepository.findOneBy.mockResolvedValue(null); // 댓글이 없을 경우
      await expect(service.getCommentById(1)).rejects.toThrow(
        CommentNotFoundException,
      ); // 예외 발생 검증
    });
  });

  // 댓글 수정 테스트
  describe('updateComment (댓글 수정)', () => {
    it('댓글을 정상적으로 수정해야 한다.', async () => {
      const comment = { id: 1, userId: 1, content: 'Old Comment' }; // 기존 댓글 데이터
      mockCommentRepository.findOneBy.mockResolvedValue(comment); // 기존 댓글 조회 설정
      mockCommentRepository.update.mockResolvedValue({}); // 업데이트 실행
      mockCommentRepository.findOneBy.mockResolvedValue({
        ...comment,
        content: 'Updated Comment',
      }); // 업데이트 후 데이터 반환

      const result = await service.updateComment(1, 1, 'Updated Comment'); // 댓글 수정 실행

      expect(mockCommentRepository.update).toHaveBeenCalledWith(
        { id: 1 },
        { content: 'Updated Comment' },
      ); // update 함수가 올바르게 호출되었는지 확인
      expect(result).toEqual({ ...comment, content: 'Updated Comment' }); // 결과 검증
    });

    it('댓글 작성자가 아니면 수정할 수 없어야 한다.', async () => {
      const comment = { id: 1, userId: 2, content: 'Old Comment' }; // 다른 사용자의 댓글
      mockCommentRepository.findOneBy.mockResolvedValue(comment);
      await expect(
        service.updateComment(1, 1, 'Updated Comment'),
      ).rejects.toThrow(CommentPermissionException); // 권한 예외 검증
    });
  });

  // 댓글 삭제 테스트
  describe('deleteComment (댓글 삭제)', () => {
    it('댓글을 정상적으로 삭제해야 한다.', async () => {
      const comment = { id: 1, userId: 1, content: 'To be deleted' }; // 삭제할 댓글
      mockCommentRepository.findOneBy.mockResolvedValue(comment); // 댓글 조회 mock 설정
      mockCommentRepository.delete.mockResolvedValue({}); // 삭제 실행 mock 설정

      const result = await service.deleteComment(1, 1); // 댓글 삭제 실행

      expect(mockCommentRepository.delete).toHaveBeenCalledWith({ id: 1 }); // delete 함수가 올바르게 호출되었는지 확인
      expect(result).toEqual({ id: 1, message: '삭제되었습니다.' }); // 삭제 결과 검증
    });

    it('존재하지 않는 댓글을 삭제하려 하면 예외가 발생해야 한다.', async () => {
      mockCommentRepository.findOneBy.mockResolvedValue(null); // 존재하지 않는 댓글
      await expect(service.deleteComment(1, 1)).rejects.toThrow(
        CommentPermissionException,
      ); // 예외 검증
    });
  });
});

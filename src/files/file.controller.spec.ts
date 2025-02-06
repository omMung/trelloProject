import { Test, type TestingModule } from '@nestjs/testing';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import type { Response } from 'express';
import { DeleteFileDto } from './dto/delete-file.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

describe('FileController 테스트', () => {
  // 컨트롤러 테스트
  let fileController: FileController;
  let fileService: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileController],
      providers: [
        {
          provide: FileService,
          useValue: {
            uploadFile: jest.fn(),
            findFiles: jest.fn(),
            deleteFile: jest.fn(),
            downloadFile: jest.fn(),
          },
        },
      ],
    })
      // JwtAuthGuard를 무시하도록 설정 (overrideGuard 사용)
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    fileController = module.get<FileController>(FileController);
    fileService = module.get<FileService>(FileService);
  });

  describe('uploadFile', () => {
    // uploadFile 테스트
    it('서비스의 uploadFile을 사용자 ID, 카드 ID, 파일과 함께 호출해야 함', async () => {
      const mockUser = { id: 1 };
      const mockCardId = '123';
      const mockFile = {
        originalname: 'test.txt',
        buffer: Buffer.from('test'),
      } as Express.Multer.File;

      await fileController.uploadFile(
        { user: mockUser } as any,
        mockCardId,
        mockFile,
      );

      expect(fileService.uploadFile).toHaveBeenCalledWith(
        mockUser.id,
        mockCardId,
        mockFile,
      );
    });
  });

  describe('findFiles', () => {
    // findFiles 테스트
    it('서비스의 findFiles를 사용자 ID와 카드 ID와 함께 호출해야 함', async () => {
      const mockUser = { id: 1 };
      const mockCardId = '123';
      const expectedResult = [{ id: 1, fileName: 'test.txt' }];

      (fileService.findFiles as jest.Mock).mockResolvedValue(expectedResult);

      const result = await fileController.findFiles(
        { user: mockUser } as any,
        mockCardId,
      );

      expect(fileService.findFiles).toHaveBeenCalledWith(
        mockUser.id,
        mockCardId,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('deleteFile', () => {
    // deleteFile 테스트
    it('서비스의 deleteFile을 사용자 ID, 카드 ID, 파일 이름과 함께 호출해야 함', async () => {
      const mockUser = { id: 1 };
      const mockCardId = '123';
      const deleteFileDto: DeleteFileDto = { fileName: 'test.txt' };

      await fileController.deleteFile(
        { user: mockUser } as any,
        mockCardId,
        deleteFileDto,
      );

      expect(fileService.deleteFile).toHaveBeenCalledWith(
        mockUser.id,
        mockCardId,
        deleteFileDto.fileName,
      );
    });
  });

  describe('downloadFile', () => {
    // downloadFile 테스트
    it('서비스의 downloadFile을 사용자 ID, 카드 ID, 파일 이름, 응답 객체와 함께 호출해야 함', async () => {
      const mockUser = { id: 1 };
      const mockCardId = '123';
      const mockFileName = 'test.txt';
      const mockRes = {} as Response;

      await fileController.downloadFile(
        { user: mockUser } as any,
        mockCardId,
        mockFileName,
        mockRes,
      );

      expect(fileService.downloadFile).toHaveBeenCalledWith(
        mockUser.id,
        mockCardId,
        mockFileName,
        mockRes,
      );
    });
  });
});

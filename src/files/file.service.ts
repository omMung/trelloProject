import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { Member } from 'src/members/entities/member.entity';
import { Card } from 'src/cards/entities/card.entity';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  // 멤버리스트 체크 로직
  private async isMember(userId: number, cardId: number, path?: string) {
    const card = await this.cardRepository.findOne({
      where: { id: cardId },
      relations: ['list', 'list.board'],
    });

    if (!card) {
      if (path) await this.deleteUploadedFile(path);
      throw new NotFoundException('카드를 찾을 수 없습니다.');
    }

    const isMember = await this.memberRepository.findOne({
      where: {
        userId,
        boardId: card.list.board.id,
      },
    });

    if (!isMember) {
      if (path) await this.deleteUploadedFile(path);
      throw new ForbiddenException('해당 보드에 대한 접근 권한이 없습니다.');
    }
  }

  // 파일 삭제 메서드
  private async deleteUploadedFile(filePath: string): Promise<void> {
    try {
      await fs.promises.unlink(filePath);
    } catch (error) {
      console.error('파일 삭제 중 오류 발생:', error);
    }
  }

  // 파일 업로드
  async uploadFile(userId: number, cardId: string, file: Express.Multer.File) {
    console.log(file);
    await this.isMember(userId, +cardId, file.path);

    if (!file) {
      throw new BadRequestException('파일이 업로드되지 않았습니다.');
    }
    try {
      await this.fileRepository.save({
        cardId: +cardId,
        fileName: file.filename,
      });
      return { message: `${file.filename} 파일이 업로드 되었습니다.` };
    } catch (error) {
      await this.deleteUploadedFile(file.path);
      throw new BadRequestException('파일 업로드 중 오류가 발생했습니다.');
    }
  }

  // 해당 카드 모든 파일 조회
  async findFiles(userId: number, cardId: string) {
    await this.isMember(userId, +cardId);

    try {
      return await this.fileRepository.find({
        where: {
          cardId: +cardId,
        },
        select: ['fileName'],
      });
    } catch (error) {
      throw new BadRequestException('파일 조회 중 오류가 발생했습니다.');
    }
  }

  // 파일 삭제
  async deleteFile(userId: number, cardId: string, fileName: string) {
    await this.isMember(userId, +cardId);
    const existFile = await this.fileRepository.findOne({
      where: {
        cardId: +cardId,
        fileName,
      },
    });

    if (!existFile) {
      throw new BadRequestException('해당 파일이 존재하지 않습니다.');
    }

    try {
      await this.fileRepository.delete({
        cardId: +cardId,
        fileName,
      });
      await this.deleteUploadedFile(`cardfiles/${fileName}`);
      return { message: `${fileName} 파일이 삭제되었습니다.` };
    } catch (error) {
      throw new BadRequestException('파일 삭제 중 오류가 발생했습니다.');
    }
  }

  // 파일 다운로드
  async downloadFile(
    userId: number,
    cardId: string,
    fileName: string,
    res: Response,
  ) {
    await this.isMember(userId, +cardId);

    const file = await this.fileRepository.findOne({
      where: {
        cardId: +cardId,
        fileName,
      },
    });

    if (!file) {
      throw new NotFoundException('파일을 찾을 수 없습니다111111111111.');
    }

    const filePath = path.join(process.cwd(), 'cardfiles', fileName);

    try {
      await fs.promises.access(filePath);
    } catch {
      throw new NotFoundException('파일을 찾을 수 없습니다.');
    }

    return res.download(filePath, fileName, (error) => {
      if (error) {
        throw new BadRequestException('파일 다운로드 중 오류가 발생했습니다.');
      }
    });
  }
}

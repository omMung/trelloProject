import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { Member } from 'src/members/entities/member.entity';
import { Card } from 'src/cards/entities/card.entity';
import { Response } from 'express';
export declare class FileService {
    private fileRepository;
    private memberRepository;
    private cardRepository;
    constructor(fileRepository: Repository<File>, memberRepository: Repository<Member>, cardRepository: Repository<Card>);
    private isMember;
    private deleteUploadedFile;
    uploadFile(userId: number, cardId: string, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    findFiles(userId: number, cardId: string): Promise<File[]>;
    deleteFile(userId: number, cardId: string, fileName: string): Promise<{
        message: string;
    }>;
    downloadFile(userId: number, cardId: string, fileName: string, res: Response): Promise<void>;
}

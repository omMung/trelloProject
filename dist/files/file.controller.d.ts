import { FileService } from './file.service';
import { DeleteFileDto } from './dto/delete-file.dto';
import { Response } from 'express';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    uploadFile(req: any, cardId: string, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    findFiles(req: any, cardId: string): Promise<import("./entities/file.entity").File[]>;
    deleteFile(req: any, cardId: string, deleteFileDto: DeleteFileDto): Promise<{
        message: string;
    }>;
    downloadFile(req: any, cardId: string, fileName: string, res: Response): Promise<void>;
}

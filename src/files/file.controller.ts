import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  UseGuards,
  Request,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileUploadInterceptor } from './interceptor/file.interceptor';
import { DeleteFileDto } from './dto/delete-file.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('cards/:id/file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileUploadInterceptor)
  async uploadFile(
    @Request() req,
    @Param('id') cardId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    const user = req.user;
    return this.fileService.uploadFile(user.id, cardId, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async findFiles(@Request() req, @Param('id') cardId: string) {
    const user = req.user;
    return this.fileService.findFiles(user.id, cardId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('')
  async deleteFile(
    @Request() req,
    @Param('id') cardId: string,
    @Body() deleteFileDto: DeleteFileDto,
  ) {
    const { fileName } = deleteFileDto;
    const user = req.user;
    return this.fileService.deleteFile(user.id, cardId, fileName);
  }

  @UseGuards(JwtAuthGuard)
  @Get('download/:fileName')
  async downloadFile(
    @Request() req,
    @Param('id') cardId: string,
    @Param('fileName') fileName: string,
    @Res() res: Response,
  ) {
    const user = req.user;
    return this.fileService.downloadFile(user.id, cardId, fileName, res);
  }
}

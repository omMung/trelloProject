import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { File } from './entities/file.entity';
import { Member } from 'src/members/entities/member.entity';
import { Card } from 'src/cards/entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File, Member, Card])],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}

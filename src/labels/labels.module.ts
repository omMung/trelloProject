import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Label } from './entities/label.entity';
import { LabelsService } from './labels.service';
import { LabelsController } from './labels.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Label]), UsersModule],
  controllers: [LabelsController],
  providers: [LabelsService],
})
export class LabelsModule {}

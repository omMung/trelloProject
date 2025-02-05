import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './entities/comment.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UsersModule],
  controllers: [CommentsController],
  providers: [CommentsService, JwtAuthGuard],
})
export class CommentsModule {}

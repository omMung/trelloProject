import { Module } from '@nestjs/common';
import { Member } from './entities/member.entity';
import { Board } from 'src/boards/entities/board.entity';
import { User } from 'src/users/entities/user.entity';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Board, User])],
  controllers: [MembersController],
  providers: [MembersService],
  exports: [TypeOrmModule], // ✅ 다른 모듈에서 MemberRepository를 사용할 수 있도록 추가
})
export class MembersModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { List } from './entities/list.entity';
import { Member } from '../members/entities/member.entity';
import { User } from '../users/entities/user.entity';
// import { EventEmitter2 } from '@nestjs/event-emitter';
import { MembersModule } from '../members/members.module'; //  MembersModule 추가
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([List, User, Member]),
    MembersModule, // ✅ MembersModule을 import하여 MemberRepository 해결
    UsersModule,
  ],
  controllers: [ListsController],
  providers: [ListsService],
  exports: [TypeOrmModule],
})
export class ListsModule {}

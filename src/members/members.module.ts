import { Module } from '@nestjs/common';
import { Member } from './entities/member.entity'
import { Board } from 'src/boards/entities/board.entity'
import { User } from 'src/users/entities/user.entity';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([Member,Board,User])
  ],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}

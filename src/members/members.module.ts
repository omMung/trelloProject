import { Module } from '@nestjs/common';
import { Member } from './entities/member.entity'
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([Member])
  ],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}

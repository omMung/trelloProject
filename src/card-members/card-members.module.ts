import { Module } from '@nestjs/common';
import { CardMembersService } from './card-members.service';
import { CardMembersController } from './card-members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JoinMember } from './entities/card-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JoinMember])],
  controllers: [CardMembersController],
  providers: [CardMembersService],
})
export class CardMembersModule {}

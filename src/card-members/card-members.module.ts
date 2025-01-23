import { Module } from '@nestjs/common';
import { CardMembersService } from './card-members.service';
import { CardMembersController } from './card-members.controller';

@Module({
  controllers: [CardMembersController],
  providers: [CardMembersService],
})
export class CardMembersModule {}

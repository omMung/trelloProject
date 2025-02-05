import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { Card } from './entities/card.entity';
import { List } from 'src/lists/entities/list.entity';
import { Member } from 'src/members/entities/member.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card, List, Member]),
    JwtModule.register({}),
    UsersModule,
  ],
  controllers: [CardsController],
  providers: [CardsService, JwtAuthGuard],
})
export class CardsModule {}

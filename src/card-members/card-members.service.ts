import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JoinMember } from './entities/card-member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardMembersService {
  constructor(
    @InjectRepository(JoinMember)
    private joinMemberRepository: Repository<JoinMember>,
  ) {}
  async create(authId: number, userId: number, cardId: number) {
    return await this.joinMemberRepository.save({
      userId,
      cardId,
    });
  }

  async findAll(authId: number, cardId: number) {
    return await this.joinMemberRepository.find({
      where: { cardId: cardId },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} cardMember`;
  }
  async remove(authId: number, cardId: number, userId: number) {
    await this.joinMemberRepository.delete({ cardId, userId });
    return `카드 멤버 지정이 해제 되었습니다.`;
  }
}

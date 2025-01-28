import { Injectable , NotFoundException} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './entities/member.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'


@Injectable()
export class MembersService {

  constructor(
    @InjectRepository(Member) private MemberRepository: Repository<Member>
  ){}

  // 멤버 추가
  create(createMemberDto: CreateMemberDto) {
    return 'This action adds a new member';
  }

  // 멤버 전체 조회
  findAll() {
    this.MemberRepository.find({
    select:[]
    })
    return `This action returns all members`;
  }

  // 멤버 상세 조회
  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  // 멤버 삭제
  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}

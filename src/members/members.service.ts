import { Injectable , NotFoundException} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { GetMemberDto } from './dto/get-member.dto'
import { Member } from './entities/member.entity'
import { Board } from 'src/boards/entities/board.entity'
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'


@Injectable()
export class MembersService {

  constructor(
    @InjectRepository(Member) private MemberRepo: Repository<Member>,
    @InjectRepository(User) private UserRepo: Repository<User>,
    @InjectRepository(Board) private BoardRepo: Repository<Board>
  ){}

  // 멤버 추가 (userId 하고 boardId 를 입력받음
  // userId를 이용해 User테이블 공개 및 boardId가 Board 에도 존재하는지 확인할껏
  async create(createMemberDto: CreateMemberDto ) {
    const {userId , boardId} = createMemberDto

    try{
    const result_board = await this.BoardRepo.findOne({
      where: {id: boardId}
    })

    if(!result_board){
      throw new NotFoundException("해당 보드 Id 값을 찾을수 없습니다")
    }

    await this.MemberRepo.save({
      userId,
      boardId,
    })

    const result = await this.UserRepo.find({
      where: {id: userId},
      select: ['name','email','phoneNumber']
    })
    
    return {message: `Trello 보드(${boardId})에 유저(${userId}) 등록 성공`,
            data: result
    }
  }
    catch (error){
      if (error instanceof NotFoundException){
        throw error
      }

      throw new Error('보드 유저 등록 중 에러가 발생')
    }
  }

  // 멤버 전체 조회
  async findAll(getMemberDto: GetMemberDto) {
    const {boardId} = getMemberDto
    try{
    const members = await this.MemberRepo.find({
      where: {id:boardId},
      select: ['userId']
    })
    
    if (!members){
      throw new Error("보드에 해당하는 유저를 찾을수가 없습니다")
    }

    const userIds = members.map(value => value.userId)

    const users = await this.UserRepo.find({
      where: {id: In(userIds)},
      select: ['name']
    })

    return {message: `Trello 보드(${boardId})에  멤버 조회 성공`,
            names: users
    };
  }
  catch(error){
    if(error instanceof NotFoundException){
      throw error
    }

    throw new Error("보드 멤버 전체 조회중 에러가 발생")
  }
}

  // 멤버 상세 조회
  async findOne(id: number , getMemberDto: GetMemberDto) {
    try{
    const {boardId} = getMemberDto

    const members = await this.MemberRepo.find({
      where: {id:boardId},
      select: ['userId']
    })

    const userIds = members.map(value => value.userId)
    
    if (!(userIds.includes(id))){
      throw new Error("보드에 해당하는 유저를 찾을수가 없습니다")
    }

    const users = await this.UserRepo.findOne({
      where: {id: +id},
      select: ['name','email','phoneNumber']
    })
    
    return {message: `Trello 보드(${boardId})에  멤버(${id}) 상세 조회 성공`,
            data: users
    }
    
  }
  catch(error){
    if(error instanceof NotFoundException){
      throw error
    }
    else{
      throw new Error("보드 멤버 상세 조회중 에러가 발생")
    }
  }
  }


  // 멤버 삭제
  async remove(id: number , getMemberDto: GetMemberDto) {
    try{
      const {boardId} = getMemberDto
  
      const members = await this.MemberRepo.find({
        where: {id:boardId},
        select: ['userId']
      })
  
      const userIds = members.map(value => value.userId)
      
      if (!(userIds.includes(id))){
        throw new Error("보드에 해당하는 유저를 찾을수가 없습니다")
      }
  
      const users = await this.UserRepo.findOne({
        where: {id: +id},
        select: ['name']
      })

      await this.UserRepo.delete({
        id:+id
      })
      
      return {message: `Trello 보드(${boardId})에  멤버(${id}) 삭제 성공`,
              name: users
      }
      
    }
    catch(error){
      if(error instanceof NotFoundException){
        throw error
      }
      else{
        throw new Error("보드 멤버 삭제중 에러가 발생")
      }
    }
    }

    
}


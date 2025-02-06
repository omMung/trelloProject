import { Injectable , NotFoundException , ForbiddenException , InternalServerErrorException} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { GetMemberDto } from './dto/get-member.dto'
import { DeleteMemberDto } from './dto/delete-member.dto'
import { DetailGetMemberDto } from './dto/detailget-member.dto'
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

  // 멤버 추가 
  async create(authId: number ,createMemberDto: CreateMemberDto ) {
    const {userId ,boardId} = createMemberDto

    try{
    const result_board = await this.BoardRepo.findOne({
      where: {id: boardId}
    })

    const result_user = await this.UserRepo.findOne({
      where: {id:userId},
      select: ['name','email','phoneNumber']
    })

    if(!result_user){
      throw new NotFoundException("해당 유저를 찾을수 없습니다")
    }

    if(!result_board){
      throw new NotFoundException("해당 보드를 찾을수 없습니다")
    }

    if(result_board.userId !== authId){
      throw new ForbiddenException("자신이 만든 보드에서만 멤버 초대가 가능합니다")
    }

    await this.MemberRepo.save({
      userId,
      boardId,
    })

    return {message: `Trello 보드(${boardId})에 유저(${userId}) 등록 성공`,
            data: result_user
    }
  }
    catch (error){
      if (error instanceof NotFoundException || error instanceof ForbiddenException){
        throw error
      }

      throw new InternalServerErrorException('보드 유저 등록 중 에러가 발생')
    }
  }

  // 멤버 전체 조회
  async findAll(getMemberDto: GetMemberDto) {
    const {boardId} = getMemberDto
    try{
    const members = await this.MemberRepo.find({
      where: {boardId:boardId},
      select: ['userId']
    })
 
    if (members.length === 0){
      throw new Error("보드에 해당하는 유저를 찾을수가 없습니다")
    }

    const userIds = members.map(value => Number(value.userId))

    const users = await this.UserRepo.find({
      where: {id: In(userIds)},
      select: ['name']
    })

    if(!users || users.length === 0) {
      throw new Error("유저들을 찾을 수 없습니다.");
    }


    return {message: `Trello 보드(${boardId})에  멤버 조회 성공`,
            names: users
    };
  }
  catch(error){
    if(error.message == "보드에 해당하는 유저를 찾을수가 없습니다"){
      throw error
    }
    else if (error.message === "유저들을 찾을 수 없습니다") {
      throw error;  
    }
    throw new InternalServerErrorException("보드 멤버 전체 조회중 에러가 발생")
  }
}

  // 멤버 상세 조회
  async findOne(id:number, detailgetMemberDto: DetailGetMemberDto) {
    try{
    const {boardId} = detailgetMemberDto

    const members = await this.MemberRepo.find({
      where: {boardId},
      select: ['userId']
    })

    const userIds = members.map(value => value.userId)
    
    if (!(userIds.includes(id))){
      throw new NotFoundException("보드에 해당하는 유저를 찾을수가 없습니다")
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
      throw new InternalServerErrorException("보드 멤버 상세 조회중 에러가 발생")
    }
  }
  }


  // 멤버 삭제
  async remove(authId: number , deleteMemberDto: DeleteMemberDto) {
    try{
      const {userId ,boardId} = deleteMemberDto

      const result_board = await this.BoardRepo.findOne({
        where: {id: boardId}
      })
  
      const result_user = await this.UserRepo.findOne({
        where: {id:userId},
        select: ['name']
      })
  
      if(!result_user){
        throw new NotFoundException("해당 유저를 찾을수 없습니다")
      }
  
      if(!result_board){
        throw new NotFoundException("해당 보드를 찾을수 없습니다")
      }
  
      if(result_board.userId !== authId){
        throw new ForbiddenException("자신이 만든 보드에서만 멤버 삭제가 가능합니다")
      }

      const users = result_user.name
    
      const find = await this.MemberRepo.findOne({
        where: {userId , boardId}
      })

      if(!find){
        throw new NotFoundException("보드안에 해당 멤버를 찾을수 없습니다")
      }
      
      const remove =await this.MemberRepo.delete({
        userId,
        boardId
      })

      return {message: `Trello 보드(${boardId})에  멤버 '${users}' (${userId})  삭제 성공`}
      
    }
    catch(error){
      if(error instanceof NotFoundException || error instanceof ForbiddenException){
        throw error
      }
      else{
        throw new InternalServerErrorException("보드 멤버 삭제중 에러가 발생")
      }
    }
    }
}


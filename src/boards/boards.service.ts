import { Injectable , NotFoundException} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {

  constructor(
    @InjectRepository(Board) private BoardRepository: Repository<Board>
  ){} // 리포지토리를 주입 받기 위한 설정

  // 보드 생성
  async create(createBoardDto: CreateBoardDto) {

    const {title, visibility, color} = createBoardDto

    const newBoard = this.BoardRepository.create({
      title,
      visibility,
      color
    })
  
    try {
      await this.BoardRepository.save(newBoard);
      return { message: "보드를 성공적으로 생성했습니다." };
    } catch (error) {
      throw new NotFoundException("보드 생성에 실패했습니다.");
    }
  }


  // 보드 전체 조회(보드 뿐만 아니라 카드나 다른 내용또한 같이 있어야 하므로 다른사람들과 같이할것)
  async findAll() { 
    try{
    const allBoard = await this.BoardRepository.find({
      select: ['id','visibility','color','title']
    })

    return {message: "모든 보드를 성공적으로 조회했습니다",
            data: allBoard
    }
  }
  catch(error){
    throw new NotFoundException("보드 전체 조회중에 에러가 발생했습니다.");
  }
  }

  // 보드 상세 조회(보드 뿐만 아니라 카드나 다른 내용또한 같이 있어야 하므로 다른사람들과 같이할것)
  async findOne(id: number) { 
    try{
    const Board = await this.BoardRepository.findOne({
      where: {id: id},
      select: ['id','visibility','color','title']
    })

    return {message: "하나의 보드를 성공적으로 조회했습니다",
      data: Board
}
  }
  catch(error){
    throw new NotFoundException("보드 상세 조회중에 에러가 발생했습니다.");
  }
  }

  // 보드 수정
  async update(id: number, updateBoardDto: UpdateBoardDto) {
    const {title , visibility , color} = updateBoardDto

    try{
    const board = await this.BoardRepository.findOne({ where: { id } });

    if (!board) {
      throw new NotFoundException('보드를 찾을 수 없습니다.');
    }
    
    await this.BoardRepository.update(id, {
      title,
      visibility,
      color
    })

    const newboard = await this.BoardRepository.findOne({ where: {id} })

    return {
      message: "보드를 성공적으로 수정했습니다",
      data: newboard
    }
    }
    catch(error){
      if(error instanceof NotFoundException){
        throw error
      }
      else{
        throw new NotFoundException('보드 수정에 에러가 발생했습니다.');
      }
    }
  }

  // 보드 삭제
  async remove(id: number) {
    try{
    const board = await this.BoardRepository.findOne({
      where: {id}
    })

    if(!board) {
      throw new NotFoundException("삭제할 대상 보드를 찾을수 없습니다")
    }

    await this.BoardRepository.remove(board)

    return { message: "보드를 성공적으로 삭제했습니다"}
    
  }
  catch(error){
    if(error instanceof NotFoundException){
      throw error
    }
    else{
      throw new NotFoundException('보드 삭제에 에러가 발생했습니다.');
    }
  }
}
}


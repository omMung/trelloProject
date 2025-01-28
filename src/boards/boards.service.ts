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

  async findAll() { // 다른 사람들과 같이 할것
    return await this.BoardRepository.find({
      select: ['id','visibility','color','title']
    })
  }

  async findOne(id: number) { // 다른 사람들과 같이 할것
    return await this.BoardRepository.findOne({
      where: {id: id},
      select: ['id','visibility','color','title']
    })
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    const {title , visibility , color} = updateBoardDto

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

  async remove(id: number) {
    const board = await this.BoardRepository.findOne({
      where: {id}
    })

    if(!board) {
      throw new NotFoundException("삭제할 대상 보드를 찾을수 없습니다")
    }

    await this.BoardRepository.remove(board)

    return { message: "보드를 성공적으로 삭제했습니다"}
    }
  }


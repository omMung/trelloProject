import { Injectable , NotFoundException} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity'
import { List } from '../lists/entities/list.entity'
import { Card } from '../cards/entities/card.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm';

@Injectable()
export class BoardsService {

  constructor(
    @InjectRepository(Board) private BoardRepository: Repository<Board>,
    @InjectRepository(List) private ListRepository: Repository<List>,
    @InjectRepository(Card) private CardRepository: Repository<Card>
  ){} // 리포지토리를 주입 받기 위한 설정

  // 보드 생성
  async create(userId ,createBoardDto: CreateBoardDto) {

    const {title, visibility, color} = createBoardDto

    const newBoard = this.BoardRepository.create({
      userId,
      title,
      visibility,
      color
    })
  
    try {
      await this.BoardRepository.save(newBoard);
      return { message: "보드를 성공적으로 생성했습니다." };
    } catch (error) {
      throw new Error("보드 생성에 실패했습니다.");
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
  async findOne(id: number) { // 2번보드에 있는 보드 ,카드,리스트 확인
    try{
    const Board = await this.BoardRepository.findOne({
      where: {id},
      select: ['id','visibility','color','title']
    })

    if(!Board){
      throw new NotFoundException("해당 보드를 찾을수 없습니다")
    }

    const List = await this.ListRepository.find({
      where: {boardId: id},
      select: ['id','position','title']
    })

    const ListId = await this.ListRepository.find({
      where: {boardId: id},
      select: ['id']
    })

    const ListIds = ListId.map(value => value.id)

    if(!List && List.length === 0){
      throw new NotFoundException("보드안에 리스트를 찾을수 없습니다")
    }

    const Card = await this.CardRepository.find({
      where: {listId: In(ListIds)},
      select: ['id', 'listId', 'title','position','color','description']
    })

    if(!Card && Card.length === 0){
      throw new NotFoundException("리스트안에 카드를 찾을수 없습니다")
    }

    const ListWithCards = List.map(list => {
      const cardsInList = Card.filter(card => card.listId === list.id);
      return {
        ...list,
        cards: cardsInList,
      };
    });

  

    return {message: "하나의 보드를 성공적으로 조회했습니다",
      data: {
        ...Board,
        lists: ListWithCards,
      }
    }
  }
  
  catch(error){
    if(error instanceof NotFoundException){
      throw error
    }
    throw new NotFoundException("보드 상세 조회중에 에러가 발생했습니다.");
  }
  }

  // 보드 수정
  async update(userId , id: number, updateBoardDto: UpdateBoardDto) {
    const {title , visibility , color} = updateBoardDto

    try{
    const board = await this.BoardRepository.findOne({ where: { id , userId } });

    if (!board) {
      throw new NotFoundException('보드를 찾을 수 없습니다.');
    }
    
    await this.BoardRepository.update({id,userId}, {
      title,
      visibility,
      color
    })

    const newboard = await this.BoardRepository.findOne({ where: {id , userId } })

    if (!newboard) {
      throw new NotFoundException('새로 업데이트한 보드를 찾을 수 없습니다.');
    }

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
  async remove(userId, id: number) {
    try{
    const board = await this.BoardRepository.findOne({
      where: {id,userId}
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


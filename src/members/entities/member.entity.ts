import { Board } from 'src/boards/entities/board.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({
  name: 'Member',
})
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  boardId: number;

  @Column('int', { nullable: false })
  userId: number;

  @ManyToOne(() => User, (user) => user.members, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Board, (board) => board.member, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'board_id' })
  board: Board;
}

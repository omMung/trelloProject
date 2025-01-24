import { Board } from 'src/boards/entities/board.entity';
import { User } from 'src/users/entities/user.entity';
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';

@Entity({
  name: 'Member',
})
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  userId: number;

  @Column('int', { nullable: false })
  boardId: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({name: "userId"})
  user: User[];

  @ManyToOne(() => Board, (board) => board.id, { onDelete: 'CASCADE' })
  @JoinColumn({name: "boardId"})
  board: Board[];
}

import { Board } from 'src/boards/entities/board.entity';
import { Card } from 'src/cards/entities/card.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity({
  name: 'List',
})
// @Unique(['boardId', 'position']) // 보드id와 포지션의 조합은 고유해야함
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  boardId: number;

  @Column('int', { nullable: false })
  position: number;

  @Column('varchar', { nullable: false })
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Board, (board) => board.list, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'board_id' })
  board: Board;

  @OneToMany(() => Card, (card) => card.list)
  cards: Card[];
}

import { Board } from 'src/boards/entities/board.entity';
import { Card } from 'src/cards/entities/card.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({
  name: 'List',
})
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  boardId: number;

  @Column('int', { nullable: false, unique: true })
  position: number;

  @Column('varchar', { nullable: false })
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Board, (board) => board.id, { onDelete: 'CASCADE' })
  board: Board[];

  @OneToMany(() => Card, (card) => card.id)
  card: Card[];
}

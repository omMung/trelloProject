import { Board } from 'src/boards/entities/board.entity';
import { CardLabel } from '../../card-labels/entities/card-label.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({
  name: 'Label',
})
@Unique(['title', 'color'])
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  boardId: number;

  @Column('varchar', { nullable: false })
  color: string;

  @Column('varchar', { nullable: false })
  title: string;

  @OneToMany(() => CardLabel, (cardLabel) => cardLabel.label)
  cardLabels: CardLabel[];

  @ManyToOne(() => Board, (board) => board.label, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'board_id' })
  board: Board;
}

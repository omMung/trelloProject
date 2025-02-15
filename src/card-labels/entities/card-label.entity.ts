import { Card } from 'src/cards/entities/card.entity';
import { Label } from 'src/labels/entities/label.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne, JoinColumn,
} from 'typeorm';

@Entity({
  name: 'CardLabel',
})
export class CardLabel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  labelId: number;

  @Column('int', { nullable: false })
  cardId: number;

  @ManyToOne(() => Card, (card) => card.id, { onDelete: 'CASCADE' })
  @JoinColumn({name: "cardId"})
  card: Card[];

  @ManyToOne(() => Label, (label) => label.id, { onDelete: 'CASCADE' })
  @JoinColumn({name: "labelId"})
  label: Label[];
}

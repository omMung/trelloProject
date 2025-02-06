import { Card } from '../../cards/entities/card.entity';
import { Label } from '../../labels/entities/label.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';

@Entity({
  name: 'CardLabel',
})
@Unique(['cardId', 'labelId'])
export class CardLabel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  labelId: number;

  @Column('int', { name: 'card_id', nullable: false })
  cardId: number;

  @ManyToOne(() => Card, (card) => card.cardLabel, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'card_id' })
  card: Card;

  @ManyToOne(() => Label, (label) => label.cardLabels, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'label_id' })
  label: Label;
}

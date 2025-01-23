import { Card } from 'src/cards/entities/card.entity';
import { Label } from 'src/labels/entities/label.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
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

  @ManyToOne(() => Card, (card) => card.id)
  card: Card[];

  @ManyToOne(() => Label, (label) => label.id)
  label: Label[];
}

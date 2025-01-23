import { Card } from 'src/cards/entities/card.entity';
import { CheckItem } from 'src/checkitems/entities/checkitem.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({
  name: 'CheckList',
})
export class CheckList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  cardId: number;

  @Column('int', { nullable: false, unique: true })
  position: number;

  @Column('varchar', { nullable: false })
  title: string;

  @ManyToOne(() => Card, (card) => card.id, { onDelete: 'CASCADE' })
  card: Card[];

  @OneToMany(() => CheckItem, (checkItem) => checkItem.id, {
    onDelete: 'CASCADE',
  })
  checkItem: CheckItem[];
}

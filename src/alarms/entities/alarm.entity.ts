import { Card } from 'src/cards/entities/card.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity({
  name: 'Alarm',
})
export class Alarm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  userId: number;

  @Column('int', { nullable: false })
  cardId: number;

  @Column('varchar', { nullable: false })
  content: string;

  @Column('boolean', { default: false })
  status: boolean;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User[];

  @ManyToOne(() => Card, (card) => card.id, { onDelete: 'CASCADE' })
  card: Card[];
}

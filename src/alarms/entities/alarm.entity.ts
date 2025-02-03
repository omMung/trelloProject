import { Card } from '../../cards/entities/card.entity';
import { User } from '../../users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
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

  @ManyToOne(() => User, (user) => user.alarms, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Card, (card) => card.alarm)
  @JoinColumn({ name: 'card_id' })
  card: Card;
}

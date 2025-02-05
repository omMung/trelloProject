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

  @Column()
  eventId: string; // 어떤 이벤트인지

  @Column('varchar', { nullable: false })
  content: string; // 알림 메시지

  @Column('boolean', { default: false })
  status: boolean; // 알림 읽음 상태

  @ManyToOne(() => User, (user) => user.alarms, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Card, (card) => card.alarm)
  @JoinColumn({ name: 'card_id' })
  card: Card;
}

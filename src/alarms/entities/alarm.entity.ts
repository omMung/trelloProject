import { Card } from '../../cards/entities/card.entity';
import { User } from '../../users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({
  name: 'Alarm',
})
export class Alarm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  userId: number;

  @Column()
  message: string; // 알람 메시지

  @Column({ default: false })
  isRead: boolean; // 알람 읽음 여부

  @CreateDateColumn()
  createdAt: Date; // 생성 날짜

  @ManyToOne(() => User, (user) => user.alarms, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Card, (card) => card.alarm)
  @JoinColumn({ name: 'card_id' })
  card: Card;
}

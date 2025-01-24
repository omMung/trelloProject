import { Card } from 'src/cards/entities/card.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({
  name: 'JoinMember',
})
export class JoinMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  userId: number;

  @Column('int', { nullable: false })
  cardId: number;

  @ManyToOne(() => User, (user) => user.joinMembers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Card, (card) => card.joinMember, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'card_id' })
  card: Card;
}

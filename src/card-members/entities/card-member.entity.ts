import { Card } from 'src/cards/entities/card.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne, JoinColumn,
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

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({name: "userId"})
  user: User[];

  @ManyToOne(() => Card, (card) => card.id, { onDelete: 'CASCADE' })
  @JoinColumn({name: "cardId"})
  card: Card[];
}

import { Card } from 'src/cards/entities/card.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne, JoinColumn,
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
  @JoinColumn({name: "userId"})
  user: User[];

  @ManyToOne(() => Card, (card) => card.id)
  @JoinColumn({name: "cardId"})
  card: Card[];
}

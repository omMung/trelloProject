import { Alarm } from '../../alarms/entities/alarm.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';
import { CardsService } from '../cards.service';
import { JoinMember } from '../../card-members/entities/card-member.entity';
import { CheckList } from '../../checklists/entities/checklist.entity';
import { CardLabel } from '../../card-labels/entities/card-label.entity';
import { List } from '../../lists/entities/list.entity';

@Entity({
  name: 'Card',
})
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  listId: number;

  @Column('varchar', { nullable: false })
  title: string;

  @Column('int', { nullable: false, unique: true })
  position: number;

  @Column('varchar', { nullable: true })
  color: string;

  @Column('varchar', { nullable: true })
  description: string;

  @Column('boolean', { default: false })
  status: boolean;

  @Column('date', { nullable: true })
  startDate: Date;

  @Column('date', { nullable: true })
  dueDate: Date;

  @OneToMany(() => Alarm, (alarm) => alarm.card)
  alarm: Alarm[];

  @OneToMany(() => Comment, (comment) => comment.card)
  comment: Comment[];

  @OneToMany(() => JoinMember, (joinMember) => joinMember.card)
  joinMember: JoinMember[];

  @OneToMany(() => CheckList, (checkList) => checkList.card)
  checkList: CheckList[];

  @OneToMany(() => CardLabel, (cardLabel) => cardLabel.card)
  cardLabel: CardLabel[];

  @ManyToOne(() => List, (list) => list.cards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'list_id' })
  list: List;
}

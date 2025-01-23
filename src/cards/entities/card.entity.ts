import { Alarm } from 'src/alarms/entities/alarm.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
import { CardsService } from '../cards.service';
import { JoinMember } from 'src/card-members/entities/card-member.entity';
import { CheckList } from 'src/checklists/entities/checklist.entity';
import { CardLabel } from 'src/card-labels/entities/card-label.entity';
import { List } from 'src/lists/entities/list.entity';

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

  @OneToMany(() => Alarm, (alarm) => alarm.id)
  alarm: Alarm[];

  @OneToMany(() => Comment, (comment) => comment.id)
  comment: Comment[];

  @OneToMany(() => JoinMember, (joinMember) => joinMember.id)
  joinMember: JoinMember[];

  @OneToMany(() => CheckList, (checkList) => checkList.id)
  checkList: CheckList[];

  @OneToMany(() => CardLabel, (cardLabel) => cardLabel.id)
  cardLabel: CardLabel[];

  @ManyToOne(() => List, (list) => list.id, { onDelete: 'CASCADE' })
  list: List[];
}

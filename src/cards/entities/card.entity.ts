import { Alarm } from '../../alarms/entities/alarm.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
import { JoinMember } from 'src/card-members/entities/card-member.entity';
import { CheckList } from 'src/checklists/entities/checklist.entity';
import { CardLabel } from 'src/card-labels/entities/card-label.entity';
import { List } from 'src/lists/entities/list.entity';
import { File } from 'src/files/entities/file.entity';

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

  @Column('int', {})
  position: number;

  @Column('varchar', { default: '#FFFFFF' })
  color: string;

  @Column('varchar', { nullable: true })
  description: string;

  @Column('boolean', { default: false })
  status: boolean;

  @Column('varchar', { nullable: true })
  startDate: string;

  @Column('varchar', { nullable: true })
  dueDate: string;

  @OneToMany(() => Comment, (comment) => comment.card)
  comment: Comment[];

  @OneToMany(() => JoinMember, (joinMember) => joinMember.card)
  joinMember: JoinMember[];

  @OneToMany(() => CheckList, (checkList) => checkList.card)
  checkList: CheckList[];

  @OneToMany(() => CardLabel, (cardLabel) => cardLabel.card)
  cardLabel: CardLabel[];

  @OneToMany(() => File, (file) => file.card)
  files: File[];

  @ManyToOne(() => List, (list) => list.cards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'list_id' })
  list: List;
}

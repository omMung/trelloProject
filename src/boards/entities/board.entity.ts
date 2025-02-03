import { IsString } from 'class-validator';
import { List } from 'src/lists/entities/list.entity';
import { Member } from 'src/members/entities/member.entity';
import { User } from 'src/users/entities/user.entity';
import { visibEnum } from '../dto/visibility.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity({
  name: 'Board',
})
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  userId: number;

  @Column({ type: 'enum', enum: visibEnum })
  visibility: visibEnum;

  @IsString()
  @Column('varchar', {})
  color: String;

  @IsString()
  @Column('varchar', { length: 10, nullable: false })
  title: String;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.boards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => List, (list) => list.board)
  lists: List[];

  @OneToMany(() => Member, (member) => member.board)
  members: Member[];
}

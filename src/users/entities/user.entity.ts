import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Member } from 'src/members/entities/member.entity';
import { Board } from 'src/boards/entities/board.entity';
import { JoinMember } from 'src/card-members/entities/card-member.entity';
import { Alarm } from 'src/alarms/entities/alarm.entity';

@Entity({
  name: 'User',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false, unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column()
  verifyCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Board, (board) => board.user) boards: Board[];
  @OneToMany(() => Member, (member) => member.user) members: Member[];
  @OneToMany(() => JoinMember, (joinMember) => joinMember.user)
  joinMembers: JoinMember[];
  @OneToMany(() => Comment, (comment) => comment.user) comments: Comment[];
  @OneToMany(() => Alarm, (alarm) => alarm.user) alarms: Alarm[];
}

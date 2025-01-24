import { IsString } from 'class-validator';
import { List } from 'src/lists/entities/list.entity';
import { Member } from 'src/members/entities/member.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany, JoinColumn,
} from 'typeorm';
enum Visibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
@Entity({
  name: 'Board',
})
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  userId: number;

  @Column({ type: 'enum', enum: Visibility })
  visibility: Visibility;

  
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

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({name: "userId"})
  user: User[];

  @OneToMany(() => List, (list) => list.id)
  list: List[];

  @OneToMany(() => Member, (member) => member.id)
  member: Member[];
}

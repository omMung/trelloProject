import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity({
  name: 'Member',
})
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  userId: number;

  @Column('int', { nullable: false })
  boardId: number;
}

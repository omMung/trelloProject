import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity({
  name: 'CheckItem',
})
export class CheckItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  checkListId: number;

  @Column('int', { nullable: true })
  memberId: number;

  @Column('varchar', { nullable: false })
  title: string;

  @Column('int', { nullable: false, unique: true })
  position: number;

  @Column('boolean', { nullable: false })
  status: boolean;
}

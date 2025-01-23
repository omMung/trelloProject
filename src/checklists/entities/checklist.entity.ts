import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity({
  name: 'CheckList',
})
export class CheckList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  cardId: number;

  @Column('int', { nullable: false, unique: true })
  position: number;

  @Column('varchar', { nullable: false })
  title: string;
}

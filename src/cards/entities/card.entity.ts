import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

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
}

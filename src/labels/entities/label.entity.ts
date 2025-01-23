import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity({
  name: 'Label',
})
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  cardId: number;

  @Column('varchar', { nullable: false })
  color: string;

  @Column('varchar', { nullable: false })
  title: string;
}

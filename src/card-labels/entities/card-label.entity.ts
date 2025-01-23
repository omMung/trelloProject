import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity({
  name: 'CardLabel',
})
export class CardLabel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  labelId: number;

  @Column('int', { nullable: false })
  cardId: number;
}

import { CardLabel } from 'src/card-labels/entities/card-label.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

  @OneToMany(() => CardLabel, (cardLabel) => cardLabel.label)
  cardLabels: CardLabel[];
}

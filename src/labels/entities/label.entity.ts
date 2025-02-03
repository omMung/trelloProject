import { CardLabel } from '../../card-labels/entities/card-label.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';

@Entity({
  name: 'Label',
})
@Unique(['title', 'color'])
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false })
  color: string;

  @Column('varchar', { nullable: false })
  title: string;

  @OneToMany(() => CardLabel, (cardLabel) => cardLabel.label)
  cardLabels: CardLabel[];
}

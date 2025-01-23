import { CardLabel } from 'src/card-labels/entities/card-label.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';

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

  @OneToMany(() => CardLabel, (cardLabel) => cardLabel.id)
  cardLabel: CardLabel[];
}

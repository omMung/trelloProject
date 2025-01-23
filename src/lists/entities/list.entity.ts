import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

@Entity({
  name: 'List',
})
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  boardId: number;

  @Column('int', { nullable: false, unique: true })
  position: number;

  @Column('varchar', { nullable: false })
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

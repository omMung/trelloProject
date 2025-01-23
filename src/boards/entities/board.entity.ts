import { IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'Board',
})
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  userId: number;

  @Column('enum', { default: false })
  visibility: Enumerator;

  @IsString()
  @Column('varchar', {})
  color: String;

  @IsString()
  @Column('varchar', { length: 10, nullable: false })
  title: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

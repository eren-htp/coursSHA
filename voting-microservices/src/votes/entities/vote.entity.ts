import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from '../../questions/entities/question.entity';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer: string; // 'Oui' or 'Non'

  @ManyToOne(() => Question, question => question.votes)
  question: Question;
}
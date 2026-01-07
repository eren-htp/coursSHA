import { Question } from '../../questions/entities/question.entity';
export declare class Vote {
    id: number;
    answer: string;
    question: Question;
}

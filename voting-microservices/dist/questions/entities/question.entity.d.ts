import { Vote } from '../../votes/entities/vote.entity';
export declare class Question {
    id: number;
    text: string;
    votes: Vote[];
}

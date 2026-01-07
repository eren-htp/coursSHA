import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
export declare class QuestionsService {
    private questionsRepository;
    constructor(questionsRepository: Repository<Question>);
    onModuleInit(): Promise<void>;
    findAll(): Promise<Question[]>;
    findOne(id: number): Promise<Question | null>;
}

import { QuestionsService } from './questions.service';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    findAll(): Promise<import("./entities/question.entity").Question[]>;
    findOne(id: string): Promise<import("./entities/question.entity").Question | null>;
}

import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { CreateVoteDto } from './dto/create-vote.dto';
export declare class VotesService {
    private votesRepository;
    constructor(votesRepository: Repository<Vote>);
    create(createVoteDto: CreateVoteDto): Promise<Vote>;
    getResults(questionId: number): Promise<{
        yes: number;
        no: number;
    }>;
}

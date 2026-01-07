import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
export declare class VotesController {
    private readonly votesService;
    constructor(votesService: VotesService);
    create(createVoteDto: CreateVoteDto): Promise<import("./entities/vote.entity").Vote>;
    getResults(questionId: string): Promise<{
        yes: number;
        no: number;
    }>;
}

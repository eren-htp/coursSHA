import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { CreateVoteDto } from './dto/create-vote.dto';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private votesRepository: Repository<Vote>,
  ) {}

  async create(createVoteDto: CreateVoteDto): Promise<Vote> {
    const vote = this.votesRepository.create({
      answer: createVoteDto.answer,
      question: { id: createVoteDto.questionId }  // Lier à la question
    });
    return this.votesRepository.save(vote);
  }

  async getResults(questionId: number): Promise<{ yes: number; no: number }> {
    const yesVotes = await this.votesRepository.count({
      where: { question: { id: questionId }, answer: 'Oui' }
    });
    const noVotes = await this.votesRepository.count({
      where: { question: { id: questionId }, answer: 'Non' }
    });
    return { yes: yesVotes, no: noVotes };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}

  // Optionnel : Ajouter une méthode pour créer des questions de test
  async onModuleInit() {
    const count = await this.questionsRepository.count();
    if (count === 0) {
      await this.questionsRepository.save([
        { text: 'Aimez-vous le café ?' },
        { text: 'Le télétravail devrait-il être la norme ?' },
      ]);
    }
  }

  findAll(): Promise<Question[]> {
    return this.questionsRepository.find();
  }

  findOne(id: number): Promise<Question | null> {
    return this.questionsRepository.findOneBy({ id });
  }
  
}
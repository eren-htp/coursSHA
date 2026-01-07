import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { Question } from './entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question])], // Importer l'entité ici
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
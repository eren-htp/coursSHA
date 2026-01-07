import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './questions/questions.module';
import { VotesModule } from './votes/votes.module';
import { Question } from './questions/entities/question.entity';
import { Vote } from './votes/entities/vote.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'voting.db', // Nom du fichier de la base de données
      entities: [Question, Vote], // Liste des entités à utiliser
      synchronize: true, // Crée automatiquement les tables (uniquement pour le développement)
    }),
    QuestionsModule,
    VotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
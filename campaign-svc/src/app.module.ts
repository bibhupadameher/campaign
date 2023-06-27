import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BoardController } from './board.controller';
import { AppService } from './app.service';
import { KnexService } from './knex.service';
import { BoardService } from './board.service';
import { BoardRepo } from './board.repo';
import { PintaService } from './pinata.service';
import { ConfigModule } from '@nestjs/config';
import { DefenderService } from './defender.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, BoardController],
  providers: [
    AppService,
    KnexService,
    BoardRepo,
    BoardService,
    PintaService,
    DefenderService,
  ],
})
export class AppModule {}

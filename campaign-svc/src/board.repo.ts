import { Injectable } from '@nestjs/common';
import { BoardEntity } from './board.entity';
import { KnexService } from './knex.service';

@Injectable()
export class BoardRepo {
  constructor(private readonly knexService: KnexService) {}
  tableName = 'boards';
  async insert(boardEntities: BoardEntity[]): Promise<boolean> {
    const knexUtil = this.knexService.getKnexUtil();
    await knexUtil(this.tableName).insert(boardEntities);
    return true;
  }

  async query(boardEntity: BoardEntity): Promise<BoardEntity[]> {
    const knexUtil = this.knexService.getKnexUtil();
    const boards: BoardEntity[] = await knexUtil(this.tableName)
      .where(boardEntity)
      .orderBy('score', 'desc')
      .limit(50);
    return boards;
  }

  async update(query: BoardEntity, update: BoardEntity): Promise<boolean> {
    const knexUtil = this.knexService.getKnexUtil();
    await knexUtil(this.tableName).where(query).update(update);
    return true;
  }

  
}

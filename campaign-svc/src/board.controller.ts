import { Controller, Get, Post, Param } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardView } from './board.entity';

@Controller()
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('/board/init')
  async init(): Promise<string> {
    return this.boardService.initializeBoard();
  }

  @Get('/board/score')
  async getBoard(): Promise<BoardView[]> {
    return this.boardService.getBoard();
  }

  @Post('/board/update')
  async updateBoard(): Promise<string> {
    return this.boardService.updateScore();
  }

  @Post('/board/mint-nft')
  async mintNFT(): Promise<string> {
    return this.boardService.mintNFT();
  }

  @Get('/board/nft/:id')
  async getNFTBalance(@Param('id') id: string): Promise<Object> {
    return this.boardService.getNFTBalance(Number(id));
  }
}

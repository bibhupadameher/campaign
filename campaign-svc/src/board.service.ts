import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BoardRepo } from './board.repo';
import { BoardEntity, BoardView } from './board.entity';
const { Web3 } = require('web3');
import { generateName, getDate } from './utility';
import { PintaService } from './pinata.service';
import { DefenderService } from './defender.service';

@Injectable()
export class BoardService {
  constructor(
    private readonly boardRepo: BoardRepo,
    private readonly pintaService: PintaService,
    private readonly defenderService: DefenderService,
  ) {}

  async initializeBoard(): Promise<string> {
    try {
      const existingProfiles = await this.boardRepo.query({});

      if (existingProfiles.length > 0) {
        throw new Error('already users are initialized');
      }
      const web3 = new Web3(process.env.RPC_ADDRESS);
      const profiles: BoardEntity[] = [];
      for (let i = 0; i < 15; i++) {
        const account = web3.eth.accounts.create();
        const profile: BoardEntity = {
          address: account.address,
          name: generateName(),
          score: 0,
        };
        profiles.push(profile);
      }
      await this.boardRepo.insert(profiles);
    } catch (err) {
      throw new HttpException({ reason: err.message }, HttpStatus.BAD_REQUEST);
    }

    return 'Board is initialized';
  }

  async getBoard(): Promise<BoardView[]> {
    const existingProfiles = await this.boardRepo.query({});
    const response: BoardView[] = [];
    for (let i = 0; i < existingProfiles.length; i++) {
      const view: BoardView = existingProfiles[i];
      view.rank = i + 1;
      response.push(view);
    }

    return response;
  }

  async updateScore(): Promise<string> {
    const existingProfiles = await this.boardRepo.query({});

    for (let i = 0; i < existingProfiles.length; i++) {
      const randomNumber = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
      await this.boardRepo.update(
        { id: existingProfiles[i].id },
        { score: randomNumber },
      );
    }

    return 'score is updated';
  }

  async mintNFT(): Promise<string> {
    try {
      const existingProfiles = await this.boardRepo.query({});
      if (existingProfiles.length < 3) {
        throw new Error('not sufficient data to mint');
      }
      const ipfsUrl: string[] = [];
      const publicAddress: string[] = [];

      const publishedDate = getDate();
      for (let i = 0; i < 3; i++) {
        const url = await this.pintaService.pinJSON(
          i + 1,
          existingProfiles[i],
          publishedDate,
        );
        ipfsUrl.push('ipfs://' + url);

        publicAddress.push(existingProfiles[i].address);
      }
      await this.defenderService.mint(publicAddress, ipfsUrl);
    } catch (err) {
      console.log(err);
      throw new HttpException({ reason: err.message }, HttpStatus.BAD_REQUEST);
    }

    return 'minting has been started ';
  }

  async getNFTBalance(userId: number): Promise<Object> {
    const existingProfiles = await this.boardRepo.query({ id: userId });
    if (existingProfiles.length == 0) {
      throw new Error('invalid userId');
    }

    const balance = await this.defenderService.balance(
      existingProfiles[0].address,
    );

    return { nftBalance: Number(balance) };
  }
}
// async init(): Promise<boolean> {

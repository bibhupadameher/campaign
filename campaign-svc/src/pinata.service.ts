import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BoardEntity } from './board.entity';

@Injectable()
export class PintaService {
  async pinJSON(
    rank: number,
    board: BoardEntity,
    publishedDate: string,
  ): Promise<string> {
    const pinataSDK = require('@pinata/sdk');
    console.log('process.env.PINATA_API_KEY :' + process.env.PINATA_API_KEY);
    const pinata = new pinataSDK({
      pinataApiKey: process.env.PINATA_API_KEY,
      pinataSecretApiKey: process.env.PINATA_API_SECRET,
    });
    const jsonFile = this.generateJSON(rank, board, publishedDate);
    const options = {
      pinataMetadata: {
        name: jsonFile.name,
      },
    };

    const result = await pinata.pinJSONToIPFS(jsonFile, options);
    console.log(result);
    return result.IpfsHash;
  }

  generateJSON(rank: number, board: BoardEntity, publishedDate: string): any {
    const jsonFile = {
      name: 'Rank ' + rank + ' of ' + publishedDate,
      description: 'Rank ' + rank + ' of ' + publishedDate,

      attributes: [
        {
          trait_type: 'Name',
          value: board.name,
        },
        {
          trait_type: 'ID',
          value: board.id,
          display_type: 'number',
        },
        {
          trait_type: 'Score',
          value: board.score,
          display_type: 'number',
        },
        {
          trait_type: 'Rank',
          value: rank,
          display_type: 'number',
        },
        {
          trait_type: 'published Date',
          value: publishedDate,
        },
      ],
    };
    return jsonFile;
  }
}

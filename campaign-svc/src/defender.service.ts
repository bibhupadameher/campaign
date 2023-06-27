/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BoardEntity } from './board.entity';
import { Relayer, RelayerTransaction } from 'defender-relay-client';

@Injectable()
export class DefenderService {
  async mint(owners: string[], ipfsUrls: string[]): Promise<string> {
    const { Web3 } = require('web3');
    const web3 = new Web3(process.env.RPC_ADDRESS);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const NFTJSON = require('../assets/CampaignNFT.json');
    let contract = new web3.eth.Contract(
      NFTJSON.abi,
      process.env.CONTRACT_ADDRESS,
    );

    const mintNFTFunction = contract.methods.mint_batch_nft(owners, ipfsUrls);
    const mintNFTFunctionAbi = mintNFTFunction.encodeABI();
    let txResponse = await this.createTransaction(mintNFTFunctionAbi);
    console.log('txResponse : ' + txResponse);

    if (txResponse.status == 'failed') {
      throw new HttpException(
        { reason: 'failed in defender' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return 'minted successfully';
  }

  async balance(owner: string): Promise<string> {
    const { Web3 } = require('web3');
    const web3 = new Web3(process.env.RPC_ADDRESS);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const NFTJSON = require('../assets/CampaignNFT.json');
    let contract = new web3.eth.Contract(
      NFTJSON.abi,
      process.env.CONTRACT_ADDRESS,
    );

    const balance = await contract.methods.balanceOf(owner).call();

    return balance;
  }

  async createTransaction(_functionAbi): Promise<RelayerTransaction> {
    const relayer = new Relayer({
      apiKey: process.env.RELAYER_API_KEY,
      apiSecret: process.env.RELAYER_API_SECRET,
    });
    const tx = await relayer.sendTransaction({
      to: process.env.CONTRACT_ADDRESS,
      value: 0,
      data: _functionAbi,
      gasLimit: 800000,
      speed: 'fastest',
    });
    return tx;
  }
}

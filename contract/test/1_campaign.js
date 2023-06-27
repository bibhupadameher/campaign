var CampaignNFT = artifacts.require("../contracts/CampaignNFT.sol");

var constant = require("./constant.js");
//const Web3 = require("web3");

contract("CampaignNFT", (accounts) => {
  var admin = accounts[0];
  var user1 = accounts[1];
  var user2 = accounts[2];
  var user3 = accounts[3];

  // const web3 = new Web3(new Web3.providers.HttpProvider(constant.RPC_ADDRESS));

  it("1. Minting ", async () => {
    const campaignNFTContract = await CampaignNFT.deployed();

    await campaignNFTContract.mint_batch_nft.sendTransaction(
      [user1, user2, user3],
      ["url1", "url2", "url3"],
      {
        from: admin,
      }
    );

    let balance = await campaignNFTContract.balanceOf.call(user1,{
      from: user1,
    });



    assert.equal(balance, 1, "minted successfully");

   
  });
});

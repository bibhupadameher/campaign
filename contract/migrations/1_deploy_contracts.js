const CampaignNFT = artifacts.require("CampaignNFT");



module.exports = async function(deployer) {

 await deployer.deploy(CampaignNFT,"CampaignNFT","C");
};

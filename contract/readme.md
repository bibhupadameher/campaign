
## FILE STRUCTURE

1. <b>/contracts/*.sol </b> -- This will store all the main contracts which requires deployment
2. <b>/contracts/helper/*.sol</b> -- This will store the helper contracts which are imported into main contracts
1. <b>/migrations/*.js </b> -- This will store all migration scripts used for deployment.
1. <b>/package.json </b> -- This will store all npm dependencies.
1. <b>/truffle-config.js </b> -- This will store all truffle configuration



## STEPS FOR DEPLOYMENT 
### PREREQUISITES
1. install <b> nodejs </b>
1. install <b> npm </b> globally
1. install <b> truffle </b> globally


### COMPILATION
1. run <b> npm install </b> to install dependencies
2. run <b>truffle compile</b>  to compile the smart contract

### POLYGON TESTNET

1. create .secret file which contains the 12 words of private keys from metamask
2. create an account in https://polygonscan.com/myapikey and replace key in truffle-config.js file -> api_keys: {
   polygonscan: '**\*\***\*\*\*\***\*\***'
   },
3. check gas price in https://gasstation-mumbai.matic.today/v2 and update value in gasPrice: 40000000000,
4. run <b> truffle migrate --network matic --reset </b>
6. collect the verified contract address <br>eg:0x1a7B381A4AcB0421bE2cc61e1f8c638Bea3408B933

8. run <b>
 truffle run verify <br>CampaignNFT@0x1a7B381A4AcB0421bE2cc61e1f8c638Bea3408B933 --network matic </b> to verify the contract [update contract address in the command ]


 9. deployed address https://mumbai.polygonscan.com/address/0xff90e32Fc8C5693D9b30365daF03c14575242FD4#code


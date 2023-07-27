# NFT Rewarding Platform  of reality show
This project integrates a web 3 platform for NFT creation and management of a reality show which rewards a NFT to top 3 scores in every week.


## Leaderboard Implementation
The project includes a leaderboard system that tracks users' rankings based on a specific criterion, which is provided as an API endpoint. Here's an overview of the leaderboard implementation:

A data structure is used to store and update the leaderboard information, including user IDs and their respective scores.
The leaderboard is updated regularly and efficiently to reflect the latest rankings.
## NFT Awarding
The project defines criteria for awarding NFTs to users. For example, NFTs may be awarded to the top 3 users on the leaderboard every week. Here's how the NFT awarding process works:

A function is implemented to identify eligible users based on the defined criteria.
The function triggers the NFT awarding process.
Unique NFTs are generated and minted for the eligible users using the chosen web 3 platform.
## API Integration
The project integrates the leaderboard and NFT awarding functionality with an existing API or provides a simple API endpoint for testing purposes. Here's an overview of the API integration:

API endpoints are implemented to allow users to retrieve their ranking on the leaderboard.
API endpoints are implemented to allow users to view the NFTs they have been awarded.

## Code
[ contract](contract/readme.md) This folder contains all the smart contract for above use-case.

[campaign-svc](campaign-svc/README.md) This folder contains the micro-service which interacts with this deployed smart contract.

## Deployment
 contract : https://mumbai.polygonscan.com/address/0xff90e32Fc8C5693D9b30365daF03c14575242FD4#code

 NFT : https://testnets.opensea.io/collection/campaignnft

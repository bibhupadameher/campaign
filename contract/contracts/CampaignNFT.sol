// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./helper/ERC721MetaData.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CampaignNFT is Ownable, ERC721MetaData, AccessControl {
    event nft_minted(address user_address_, uint256 tokenId_);

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    uint256 MINTING_INTERVAL = 300; //in seconds = 5 minutes
    uint256 NO_OF_WINNER = 3;
    uint256 last_minted_time;

    constructor(
        string memory name_,
        string memory symbol_
    ) ERC721MetaData(name_, symbol_) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        last_minted_time = block.timestamp - MINTING_INTERVAL;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721, AccessControl) returns (bool) {
        return
            ERC721.supportsInterface(interfaceId) ||
            AccessControl.supportsInterface(interfaceId);
    }

    function mint_batch_nft(
        address[] memory winners_,
        string[] memory tokenURIs_
    ) public returns (bool) {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a MINTER");
        require(winners_.length == tokenURIs_.length, "Arrays length mismatch");
        require(winners_.length == NO_OF_WINNER, "Arrays length mismatch");
        require(
            block.timestamp - last_minted_time >= MINTING_INTERVAL,
            "not allowed to mint now"
        );

        for (uint256 i = 0; i < NO_OF_WINNER; i++) {
            uint256 newTokenId = _tokenIdCounter.current();
            _safeMint(winners_[i], newTokenId);
            _setTokenURI(newTokenId, tokenURIs_[i]);
            _tokenIdCounter.increment();
            emit nft_minted(winners_[i], newTokenId);
        }

        last_minted_time = block.timestamp;

        return true;
    }
}

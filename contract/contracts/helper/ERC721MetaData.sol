// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";



contract ERC721MetaData is  ERC721{
constructor(string memory name_,string memory symbol_)  ERC721(name_, symbol_){ 
  }
mapping(uint256 => string) private _tokenURIs;

     function _setTokenURI(uint256 tokenId_, string memory tokenURI_) internal {
        require(_exists(tokenId_));
        _tokenURIs[tokenId_] = tokenURI_;
    }
    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_));
        return _tokenURIs[tokenId_];
    }
}
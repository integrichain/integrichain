pragma solidity ^0.4.17;

contract HashStorage {
  uint256[] public hashes;
  event HashIndexReturned(uint256 index);
  event HashReturned(uint256 hash);

  function addHash(uint256 newHash) external returns (uint256){
    hashes.push(newHash);
    HashIndexReturned(hashes.length - 1); // emit an event containing the index that can be picked up in JS
  }

  function getHashes() public view returns (uint256[]) {
    return hashes;
  }
}

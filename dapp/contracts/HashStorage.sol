pragma solidity ^0.4.17;

contract HashStorage {
  uint256[] public hashes;
  event HashIndexReturned(uint256 index);

  function addHash(uint256 newHash) external returns (uint256){
    hashes.push(newHash);
    HashIndexReturned(hashes.length - 1); // emit an event containing the index that can be picked up in JS
    return hashes.length - 1; // the array index of the new hash
  }

  function getHashByIndex(uint256 index) external view returns (uint256) {
    if (index <= hashes.length - 1) { // ensure that the index is not out of bounds
      return hashes[index];
    } else {
      return 0;
    }
  }
}

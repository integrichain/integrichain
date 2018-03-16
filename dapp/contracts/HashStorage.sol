pragma solidity ^0.4.17;

contract HashStorage {
  uint256 public hash;

  function setHash(uint256 newHash) external {
    hash = newHash;
  }
}

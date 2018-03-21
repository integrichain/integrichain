pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/HashStorage.sol";

contract TestHashStorage {
  HashStorage hashStorage = HashStorage(DeployedAddresses.HashStorage());

  function testStoresHashWithAddHash() public {
    // some SHA3-224 hash
    uint256 originalHash = uint256(0x4918224b25f43bfa8651156fb47915a3544cc5bbdf59eb72e89bbc36);

    uint256 hashIndex = hashStorage.addHash(originalHash);

    uint256 storedHash = hashStorage.getHashByIndex(hashIndex);

    Assert.equal(storedHash, originalHash, "Retrieved hash should be the same as the original hash that was stored.");


    uint256 zeroHash = 0;
    uint256 outOfBoundsIndex = hashIndex + 1;

    uint256 shouldBeZeroHash = hashStorage.getHashByIndex(outOfBoundsIndex);

    Assert.equal(shouldBeZeroHash, zeroHash, "Retrieved hash should be the same as the original hash that was stored.");
  }
}

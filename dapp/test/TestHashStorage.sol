pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/HashStorage.sol";

contract TestHashStorage {
  HashStorage hashStorage = HashStorage(DeployedAddresses.HashStorage());

  function testStoresAndRetrievesHash() public {
    // some SHA3-224 hash
    uint256 originalHash = uint256(0x4918224b25f43bfa8651156fb47915a3544cc5bbdf59eb72e89bbc36);

    hashStorage.setHash(originalHash);
    uint256 storedHash = hashStorage.hash();

    Assert.equal(originalHash, storedHash, "Expected storedHash to equal originalHash");
  }
}

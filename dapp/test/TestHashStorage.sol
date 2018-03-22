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

    // we can't test retrieval of the hashes becuase contracts can't return dynamically sized arrays
    // to other contracts (i.e. this one) as a result of a function call :(
    // All we can do is assert there was no error while storing
  }
}

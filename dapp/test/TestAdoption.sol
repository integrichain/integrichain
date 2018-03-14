pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Adoption.sol";

contract TestAdoption {
  uint petId = 8;
  Adoption adoption = Adoption(DeployedAddresses.Adoption());

  function testUserCanAdoptPet() public {
    uint expected = petId;
    uint returnedId = adoption.adopt(expected);

    Assert.equal(returnedId, expected, "Adoption of expected pet ID");
  }

  function testGetAdoptersAddressByPetId() public {
    // uint petId = petId; // added in testUserCanAdoptPet()
    address expected = this;
    address adopter = adoption.adopters(petId);

    Assert.equal(adopter, expected, "Owner of expected pet ID should be recorded");
  }

  function testGetAdopterAddressByPetIdInArray() public {
    address expected = this;

    // Store adopters in memory rather than the contract's storage
    address[16] memory adopters = adoption.getAdopters();


    Assert.equal(adopters[petId], expected, "Owner of pet should be recorded.");
  }
}

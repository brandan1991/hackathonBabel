pragma solidity ^0.4.17;

contract Adoption {
  // Array pets owners
  address[16] public adopters;

  // Adopting pet function
  function adopt(uint petId) public returns (uint){
    require(petId >= 0 && petId <= 15);

    adopters[petId] = msg.sender;

    return petId;
  }

  // Get adopters array
  function getAdopters() public view returns (address[16]) {
    return adopters;
  }
}
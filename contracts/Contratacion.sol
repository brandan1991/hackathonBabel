pragma solidity ^0.4.19;

contract Contratacion {

    mapping (uint => address) public servicio;


    struct CLiente {
        uint idCliente;
        uint idServicio;
    }

    
    function contratar(uint idServicio) public  returns (uint) {
        servicio[idServicio] = msg.sender;
        return idServicio;
    }
}
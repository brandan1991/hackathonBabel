pragma solidity ^0.4.19;

contract Contratacion {

    mapping (uint => address) public servicio;


    struct CLiente {
        address addressCliente;
        uint idServicio;
        uint importe;
    }

    CLiente[] public clientes;

    
    function contratar(uint idServicio) public payable  returns (uint) {
        clientes.push(CLiente(msg.sender, idServicio, msg.value));
        return idServicio;
    }
}
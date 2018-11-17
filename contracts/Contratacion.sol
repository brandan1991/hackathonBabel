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


    function devolver(uint idServicio) public payable  returns (uint) {
        clientes.push(CLiente(msg.sender, idServicio, msg.value));

       for (uint i = 0; i < clientes.length; i++) {
            CLiente cliente = clientes[i];
            if(cliente.addressCliente == msg.sender) {
                msg.sender.transfer(cliente.importe);
            }
        }        
        return idServicio;
    }
}
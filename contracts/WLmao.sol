// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Inteface.sol";
contract WLMAOToken is ERC20{
    // IWLMAO 
address LMAO;
      
     constructor(address _address) ERC20("WLMAO", "WLMT"){
       LMAO = _address;
    }
     function depositLMAO( uint value) public {
       IWLMAO(LMAO).transferFrom(msg.sender, address(this), value);
    //    IWLMAO(LMAO)._transfer(deployer, value);(msg.sender, address(this), value);
          uint fee = value * 8/100;
        uint amount = value - fee;
       _mint(msg.sender, amount );
    }
   
   
    function withdrawLMAO(uint value) public {
          IWLMAO(LMAO).transfer( msg.sender, value);
          _burn(msg.sender, value) ;
    }
}
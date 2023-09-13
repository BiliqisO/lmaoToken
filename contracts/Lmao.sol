// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract LMAOToken is ERC20{
    address deployer;
    constructor() ERC20("LMAO", "LMT"){
         deployer = msg.sender;
    }
    function mint() external{
        _mint(msg.sender, 1000);
    } 
function _transfer(address from, address to, uint256 value) internal virtual override {
        uint fee = value * 8/100;
        uint amount = value - fee;
        // from = msg.sender;
       super._transfer(from, deployer, fee); 
       super._transfer(from, to, amount);      
    }
    // receive() external payable{}
    // fallback() external payable {}
}
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
interface IWLMAO{
    function _transfer(address from, address to, uint256 value) external  ;
    function transferFrom(address _from, address _to, uint256 _value) external  returns (bool success);
    function transfer(address _to, uint256 _value) external  returns (bool success);
    function mint() external;
    function approve(address spender, uint256 amount) external view returns (bool);
     function depositLMAO( uint value) external view;
     function balanceOf(address account) external view returns (uint256);

}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Counter {
    uint256 public count;

    constructor(uint256 _initial) {
        count = _initial;
    }

    function increment() public {
        count += 1;
    }

    function add(uint256 value) public {
        count += value;
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}

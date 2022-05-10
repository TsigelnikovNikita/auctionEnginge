//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract AucEngine {
    address public owner;
    uint constant DURATION = 2 days;
    uint constant FEE = 10; // 10%

    struct Auction {
        address payable seller;
        uint startingPrice;
        uint finalPrice;
        uint startAt;
        uint endsAt;
        uint discountRate;
        string item;
        bool stopped;
    }

    Auction[] public auctions;

    constructor() {
        owner = msg.owner;
    }
}

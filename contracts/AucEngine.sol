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

    event AuctionCreated(uint index, string itemName, uint startingPrice, uint duration);

    constructor() {
        owner = msg.sender;
    }

    function createAuction(
        uint _strartingPrice,
        uint _discountRate,
        string calldata _item,
        uint _duration
    ) external
    {
        require(_strartingPrice >= _discountRate * _duration, "incorrect starting price");

        _duration = _duration == 0 ? DURATION : _duration;

        Auction memory newAuciton = Auction({
            seller: payable(msg.sender),
            startingPrice: _strartingPrice,
            finalPrice:  _strartingPrice,
            discountRate: _discountRate,
            startAt: block.timestamp,
            endsAt: block.timestamp + _duration,
            item : _item,
            stopped: false
        });

        auctions.push(newAuciton);

        emit AuctionCreated(auctions.length - 1, _item, _strartingPrice, _duration);
    }

    
}

# auctionEnginge Smart Contract

### Description of smart contract
This smart contract is designed for [Dutch auctions](https://en.wikipedia.org/wiki/Dutch_auction) creating. Anyone can create a new auction and anyone can buy an item.

### Stack
The smart contract is written using Solidity for the Ethereum blockchain.
I used to [hardhat](https://hardhat.org/) as a development environment framework.

### How to install
- First you need to clone this repo to your machine:<br>
  ```git clone https://github.com/TsigelnikovNikita/auctionEngine.git```
- Then you need to install all requirements from package.json:<br>
   ```npm install```
- After that you need to check that you have an installed hardhat framework:<br>
  ```npx hardhat```
- The last one is just compiling the contract!:<br>
  ```npx hardhat compile ```

If you have got ```Compiled 6 Solidity files successfully``` output that's mean that everything is okay, and you can use Vote
Smart Contract! 

### Unit-tests
This contract has a lot of unit-test with 100% coverage. You can run these using:<br>
```npx hardhat test```

Also, you may want to check coverage. You can do it using:<br>
```npx hardhat coverage```

This command will print the result in the standard output. You also may check it using coverage/index.html file.

### Proposal and remarks
It's just a study work. If you have any proposals or remarks please feel free and let me know about it.

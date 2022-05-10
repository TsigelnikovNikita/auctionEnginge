const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AucEngine", function () {
    let owner
    let seller
    let buyer
    let auction

    beforeEach(async function () {
        [owner, buyer] = await ethers.getSigners()

        const AucEngine = await ethers.getContractFactory("AucEngine", owner)
        auction = await AucEngine.deploy()
        await auction.deployed()            
    })

    it("sets owner", async function () {
        const currentOwner = await auction.owner()
        expect(currentOwner).to.eq(owner.address)        
    })
})

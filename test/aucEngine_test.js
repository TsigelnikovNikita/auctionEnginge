const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AucEngine", function () {
    let owner
    let seller
    let buyer
    let auction

    beforeEach(async function () {
        [owner, buyer, seller] = await ethers.getSigners()

        const AucEngine = await ethers.getContractFactory("AucEngine", owner)
        auction = await AucEngine.deploy()
        await auction.deployed()            
    })

    async function getTimestamp(bn) {
        return (
            await ethers.provider.getBlock(bn)
        ).timestamp
    }

    it("sets owner", async function () {
        const currentOwner = await auction.owner()
        expect(currentOwner).to.eq(owner.address)        
    })

    describe("createAucion", function () {
        it("create auction correctly", async function () {
            const duration = 60
            const tx = await auction.connect(seller).createAuction(
                ethers.utils.parseEther("0.0001"),
                3,
                "Fake item",
                duration
            )

            const cAuction = await auction.auctions(0)
            expect(cAuction.item).to.eq("Fake item")

            const ts = await getTimestamp(tx.blockNumber)
            expect(cAuction.endsAt).to.eq(ts + duration)
        })
    })

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    describe("buy", function () {
        it("allows to buy", async function() {
            const duration = 60
            await auction.connect(seller).createAuction(
                ethers.utils.parseEther("0.0001"),
                3,
                "Fake item",
                duration
            )

            this.timeout(5000)
            await delay(1000)

            const buyTx = await auction.connect(buyer).
                buy(0, {value: ethers.utils.parseEther("0.0001")})

            const cAuction = await auction.auctions(0)
            const finalPrice = cAuction.finalPrice
            await expect(() => buyTx).
                to.changeEtherBalance(
                    seller, finalPrice - Math.floor((finalPrice * 10) / 100)
                    )

            // check that event was emited
            await expect (buyTx)
                .to.emit(auction, 'auctionEnded')
                .withArgs (0, finalPrice, buyer.address);

            await expect(
                auction.connect(buyer).
                    buy(0, {value: ethers.utils.parseEther("0.0001")})
            ).to.be.revertedWith('stopped!');
        })
    })
})

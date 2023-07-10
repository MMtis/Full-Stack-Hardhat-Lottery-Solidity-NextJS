const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

const BASE_FEE = ethers.utils.parseEther("0.25") // 0.25 is the premium. It cost 0.25 Link per request
// Price feeds are already being sponsored. No fee needed
const GAS_PRICE_LINK = 1e9 // link per gas. calculated value based on the gas price of the chain

// ETH price goes up 1M
// Chainlink nodes pay the gas fees to give us randomness & do external execution
// So the price of requests change based on the price of gas

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [BASE_FEE, GAS_PRICE_LINK]
    log(deployer)

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...")
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
        log("Mocks deployed")
        log("--------------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]

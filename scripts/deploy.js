"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
async function main() {
    const usdcTokenAddress = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
    //  get the signer (wallet) that is deploying the contract
    const [deployer] = await hardhat_1.ethers.getSigners();
    //  print the deployer address and his balance
    console.log("Deploying contracts with the account:", deployer.address);
    const balance = await deployer.getBalance();
    console.log("Account balance:", hardhat_1.ethers.utils.formatEther(balance), "ETH");
    const SquaryFactory = await hardhat_1.ethers.getContractFactory("Squary");
    const squary = await SquaryFactory.deploy(usdcTokenAddress);
    await squary.deployed();
    console.log("Squary deployed to:", squary.address);
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});

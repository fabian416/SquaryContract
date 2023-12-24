import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
      },
      {
        version: "0.8.19"
      }
    ]
  },  
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/34a2351fd1f941e2b9f06fcb04438029",
      accounts: process.env.PRIVATE_KEY1 ? [process.env.PRIVATE_KEY1] : [],
    },
  },
};

export default config;

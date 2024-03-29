import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";


const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.19"
      }
    ]
  },
  networks: {
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: process.env.PRIVATE_KEY1 ? [process.env.PRIVATE_KEY1] : [],
    },
  },
};

export default config;


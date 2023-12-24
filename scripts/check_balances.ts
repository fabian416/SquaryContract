const { ethers } = require("hardhat");
import * as dotenv from "dotenv";

dotenv.config();

async function main() {

    const contractAddress = "0xE94E9d573E547DF5B7FCeDA6B03ee279e5B864Ce"
    const gnosisSafeAddress = "0xAdE751A7A96d7d0c2193BE7cFFFb94799209F31d"
    const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
    const abi = [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_usdcTokenAddress",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "gnosisSafe",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "member",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "DepositMade",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "gnosisSafe",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address[]",
            "name": "members",
            "type": "address[]"
          }
        ],
        "name": "GroupCreated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "gnosisSafe",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "debtor",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "creditor",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "SettleCompleted",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "gnosisSafe",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "member",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "WithdrawalMade",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_gnosisSafe",
            "type": "address"
          },
          {
            "internalType": "address[]",
            "name": "_members",
            "type": "address[]"
          }
        ],
        "name": "createGroup",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "gnosisSafe",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "depositFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "gnosisSafe",
            "type": "address"
          }
        ],
        "name": "getGroupDetails",
        "outputs": [
          {
            "internalType": "address[]",
            "name": "members",
            "type": "address[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "gnosisSafe",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "member",
            "type": "address"
          }
        ],
        "name": "getMemberBalance",
        "outputs": [
          {
            "internalType": "int256",
            "name": "",
            "type": "int256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "groups",
        "outputs": [
          {
            "internalType": "address",
            "name": "gnosisSafe",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "gnosisSafe",
            "type": "address"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "debtor",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "creditor",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "internalType": "struct Squary.Debt[]",
            "name": "simplifiedDebts",
            "type": "tuple[]"
          }
        ],
        "name": "settleGroup",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "usdcToken",
        "outputs": [
          {
            "internalType": "contract IERC20",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "gnosisSafe",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "withdrawFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
    // Create an instance of the contract
    const squaryContract = new ethers.Contract(contractAddress, abi, provider);
    // Addresses of the members
    const members = ["0x18dd4b2D74D7269Fc68c4da13bE9Bd8CB2b8231B","0xceb0dB721150692b9DEDf566Dee240dc38bb1E65","0x75767610d15FA80425a2BDF6Cd8FCA6444786189","0x724849ca29166a27cA9a2f03A7EA15C0e8687f7A"];
    // balances check the balances
    for (let member of members) {
        let balance = await squaryContract.getMemberBalance(gnosisSafeAddress, member);
        console.log(`Balance de ${member}: ${balance.toString()}`); 
    }
}
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

const contractAddress = "0xe499dd05FeFeE4aAFd30437171A67b90de2c350D";
const encodedData = "0xdeac05820000000000000000000000004079e8a3e549dc86f59719fd540ea7f91113a65600000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000005000000000000000000000000fbc66bd8466f7b7628fd32f8a8c07f3976c7397900000000000000000000000075767610d15fa80425a2bdf6cd8fca644478618900000000000000000000000000000000000000000000000000000000002625a0000000000000000000000000e5e43e89dfddaea8408657d9957161e7a50231de00000000000000000000000075767610d15fa80425a2bdf6cd8fca644478618900000000000000000000000000000000000000000000000000000000002625a0000000000000000000000000724849ca29166a27ca9a2f03a7ea15c0e8687f7a00000000000000000000000075767610d15fa80425a2bdf6cd8fca644478618900000000000000000000000000000000000000000000000000000000002625a000000000000000000000000018dd4b2d74d7269fc68c4da13be9bd8cb2b8231b00000000000000000000000075767610d15fa80425a2bdf6cd8fca644478618900000000000000000000000000000000000000000000000000000000002625a0000000000000000000000000c97e9be291586e4a8c7e8ab858020873e64711eb00000000000000000000000075767610d15fa80425a2bdf6cd8fca644478618900000000000000000000000000000000000000000000000000000000002625a0";  // Reemplaza con los datos codificados reales
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
        },
        {
          "internalType": "bool",
          "name": "settleCompleted",
          "type": "bool"
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
        },
        {
          "internalType": "bool",
          "name": "settleCompleted",
          "type": "bool"
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
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "withdrawFunds",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

async function decodeTransaction() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
    const contract = new ethers.Contract(contractAddress, abi, provider);

    try {
        const decodedData = contract.interface.parseTransaction({ data: encodedData });
        console.log(decodedData);
    } catch (error) {
        console.error("Error al decodificar la transacción:", error);
    }
}

decodeTransaction();

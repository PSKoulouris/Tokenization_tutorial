/*
- 1: Compile CounterSolAdv.sol smart contract
- 2: Copy ABI/Bytecode and past to contract-functionon-exec.js
- 3: execute contract-function-exec.js 
- 4: You can do another test from Remix to see same execution numbers

*/

import Web3 from "web3";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Connect to Sepolia
const web3 = new Web3(process.env.SEPOLIA_RPC_URL);

// Load private key
const account = web3.eth.accounts.privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

console.log("Using account:", account.address);

// Load compiled contract JSON (from Remix or Hardhat)
//const contractJson = JSON.parse(fs.readFileSync("./Counter.json", "utf-8"));
//const { abi, bytecode } = contractJson;

const bytecode = "6080604052348015600e575f5ffd5b506040516102af3803806102af8339818101604052810190602e9190606b565b805f81905550506091565b5f5ffd5b5f819050919050565b604d81603d565b81146056575f5ffd5b50565b5f815190506065816046565b92915050565b5f60208284031215607d57607c6039565b5b5f6088848285016059565b91505092915050565b6102118061009e5f395ff3fe608060405234801561000f575f5ffd5b506004361061004a575f3560e01c806306661abd1461004e5780631003e2d21461006c578063a87d942c14610088578063d09de08a146100a6575b5f5ffd5b6100566100b0565b6040516100639190610109565b60405180910390f35b61008660048036038101906100819190610150565b6100b5565b005b6100906100cf565b60405161009d9190610109565b60405180910390f35b6100ae6100d7565b005b5f5481565b805f5f8282546100c591906101a8565b9250508190555050565b5f5f54905090565b60015f5f8282546100e891906101a8565b92505081905550565b5f819050919050565b610103816100f1565b82525050565b5f60208201905061011c5f8301846100fa565b92915050565b5f5ffd5b61012f816100f1565b8114610139575f5ffd5b50565b5f8135905061014a81610126565b92915050565b5f6020828403121561016557610164610122565b5b5f6101728482850161013c565b91505092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f6101b2826100f1565b91506101bd836100f1565b92508282019050808211156101d5576101d461017b565b5b9291505056fea26469706673582212200e6578ecd981ba46cb50ea61c7ae4ed3729788a860d4c44ee5379c1f966ea4af64736f6c634300081e0033";
const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_initial",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "add",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "count",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "increment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

async function main() {
    // 1 Deploy contract
    const counterContract = new web3.eth.Contract(abi);

    const deployTx = counterContract.deploy({
        data: bytecode,
        arguments: [10], // initial count = 10
    });

    const gasEstimate = await deployTx.estimateGas();
    const deployedContract = await deployTx.send({
        from: account.address,
        gas: gasEstimate,
    });

    console.log("Contract deployed at:", deployedContract.options.address);

    // 2 Call read-only function (call)
    const currentCount = await deployedContract.methods.getCount().call();
    console.log("Current count (call):", currentCount);

    // 3️ Execute state-changing function (send)
    const txReceipt = await deployedContract.methods.increment().send({
        from: account.address,
        gas: 100000, // can adjust
    });
    console.log("Increment transaction receipt:", txReceipt.transactionHash);

    // Check updated count
    const updatedCount = await deployedContract.methods.getCount().call();
    console.log("Updated count (after increment):", updatedCount);

    // 4️ Execute another state-changing function with argument
    await deployedContract.methods.add(5).send({
        from: account.address,
        gas: 100000,
    });

    const finalCount = await deployedContract.methods.getCount().call();
    console.log("Final count (after add 5):", finalCount);
}

main().catch((err) => console.error(err));

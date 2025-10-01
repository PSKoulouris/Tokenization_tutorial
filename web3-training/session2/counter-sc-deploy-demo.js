/*
- 1: Copy Counter.sol
- 2: Compile to solidity
- 3: Add ABI and bytecode 
- 4: npm install dotenv
- 5: create .env file
- 6: add SEPOLIA_RPC_URL (you RPC for sepolia)
- 7: add private key of you account from Sepolit in SEPOLIA_PRIVATE_KEY
- 8: execute class, and will receive something like this 

		Deploying contract from: 0x7BAA824d93985a782dA180e19a47252e63f41dBF
		Contract deployed at: 0xE912224d3c52168c1546a1c09384Fcce80c13400
		Initial count (call) = 0n
		Increment tx hash: 0x7188daa504e672b958b918ff479b3e8efe60b00d00d42d557b348e628990766d
		Updated count (call) = 1n

*/

import Web3 from "web3";//npm install web3
import dotenv from "dotenv";//npm install dotenv
dotenv.config();

// Load environment vars
const rpcUrl = process.env.SEPOLIA_RPC_URL;
const privateKey = process.env.SEPOLIA_PRIVATE_KEY;
const web3 = new Web3(rpcUrl);

// Replace with your contract's ABI + bytecode (from compilation)
const abi = [

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

const bytecode = "6080604052348015600e575f5ffd5b506101778061001c5f395ff3fe608060405234801561000f575f5ffd5b506004361061003f575f3560e01c806306661abd14610043578063a87d942c14610061578063d09de08a1461007f575b5f5ffd5b61004b610089565b60405161005891906100c8565b60405180910390f35b61006961008e565b60405161007691906100c8565b60405180910390f35b610087610096565b005b5f5481565b5f5f54905090565b60015f5f8282546100a7919061010e565b92505081905550565b5f819050919050565b6100c2816100b0565b82525050565b5f6020820190506100db5f8301846100b9565b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610118826100b0565b9150610123836100b0565b925082820190508082111561013b5761013a6100e1565b5b9291505056fea2646970667358221220c2cc3244cfb4067cecf541a561e79d38ab96bd6b3b4c0ea1569c017f0fdd818e64736f6c634300081e0033"; // paste compiled bytecode

const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

async function main() {
  console.log("Deploying contract from:", account.address);

  // 1️ new Contract()
  const contract = new web3.eth.Contract(abi);

  // 2️ deploy()
  const deployed = await contract
    .deploy({ data: bytecode })
    .send({ from: account.address, gas: 2000000 });

  console.log("Contract deployed at:", deployed.options.address);

  // 3️ methods.call() - read only
  const initial = await deployed.methods.getCount().call();
  console.log("Initial count (call) =", initial);

  // 4️ methods.send() - state changing
  const tx = await deployed.methods.increment().send({ from: account.address });
  console.log("Increment tx hash:", tx.transactionHash);

  const updated = await deployed.methods.getCount().call();
  console.log("Updated count (call) =", updated);
}

main().catch(console.error);

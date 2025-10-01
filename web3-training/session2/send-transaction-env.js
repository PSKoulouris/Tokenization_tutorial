//Using environment variables is the standard way to keep sensitive data like private keys out of your code. 
// This protects them from accidental commits to Git, leaks, or sharing. Here’s a clear step-by-step guide and example:

/*

1. Install dotenv.  dotenv is a small library that loads environment variables from a .env file into process.env.
npm install dotenv

2. Create a .env file

In the root of your project, create a file called .env (never commit this to Git!)

SEPOLIA_PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE
INFURA_PROJECT_ID=18e3c9187d6d4c11a36a76051c3f9b9a

3. Use the environment variables in Node.js, as shown in the code below:
*/

import dotenv from "dotenv";
import Web3 from "web3";

dotenv.config();//load a local variable 

const PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;
const INFURA_ID = process.env.INFURA_PROJECT_ID;
//console.log("Private key:", process.env.SEPOLIA_PRIVATE_KEY);
//console.log("Length:", process.env.SEPOLIA_PRIVATE_KEY?.length);

// Connect to Sepolia via Infura
const web3 = new Web3(`https://sepolia.infura.io/v3/${INFURA_ID}`);

// Replace with your recipient account
const recipient = "0x4ac0B979AA1290c7776Ba4b41adFc4cCF525078F";

async function sendTransaction() {
  try {
    const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
    const sender = account.address;

    const nonce = await web3.eth.getTransactionCount(sender);

    const tx = {
      from: sender,
      to: recipient,
      value: web3.utils.toWei("0.001", "ether"),
      gas: 21000,
      maxPriorityFeePerGas: web3.utils.toWei("2", "gwei"), // tip for miners
      maxFeePerGas: web3.utils.toWei("50", "gwei"),
      nonce: nonce,
      chainId: 11155111 // Sepolia
    };

    const signedTx = await account.signTransaction(tx);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log("Transaction successful! Hash:", receipt.transactionHash);
  } catch (err) {
    console.error("Transaction error:", err);
  }
}

sendTransaction();




/*  HOMEWORK for students: 

in addition, .env can be ecrypted via 

1. npm install dotenv

2. Create .env (or encrypted .env.enc)

--> dotenvx you can also encrypt the file for production.

3. Load env in ESM script

    import { config } from "dotenvx";
    config(); // injects process.env

    console.log("Private key:", process.env.SEPOLIA_PRIVATE_KEY);

    If using encrypted file:
    config({ path: "./.env.enc", password: process.env.DOTENVX_PASSWORD });


*/

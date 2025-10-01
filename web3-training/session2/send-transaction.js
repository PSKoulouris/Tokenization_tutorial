/*
For the global context understanding, use metamask to perform a transfer, then, use 
this class send-transaction.js to demo with web3 code.

Generate 2 accounts.
 - use create-accounts.js
 
Fund the first account with Sepolia ETH.
 
Send a small transaction from account1 → account2.

Observe the transaction hash and confirm in Sepolia block explorer.
*/



import Web3 from "web3";

const web3 = new Web3("https://sepolia.infura.io/v3/24e32d0fd23c43c9a7b60ecad8f42dee");

// Replace with your generated accounts
const account1 = {
  address: "0x211704eC4D3C01Bbd9CDf942Bd7F78C99B399429",
  privateKey: "0xce2ba647ca26ff9515f37bed7e01bdc54755772e33b3d89c6629384e725168d7"
};

const account2 = {
  address: "0x4ac0B979AA1290c7776Ba4b41adFc4cCF525078F",
  privateKey: "0xdda141b0ff006ab63040231af5b8f9d0215150f61ba191d6770215dcde1ae62a"
};

async function sendTransaction() {
  // Get current nonce for account1
  const nonce = await web3.eth.getTransactionCount(account1.address);

  // Build the transaction
  const tx = {
    from: account1.address,
    to: account2.address,
    value: web3.utils.toWei("0.001", "ether"),
    gas: 21000,
    maxPriorityFeePerGas: web3.utils.toWei("2", "gwei"), // tip for miners
    maxFeePerGas: web3.utils.toWei("50", "gwei"),
    nonce: nonce,
    chainId: 11155111 // Sepolia chain ID
  };

  // Sign the transaction
  const signedTx = await web3.eth.accounts.signTransaction(tx, account1.privateKey);

  // Send the signed transaction
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  console.log("Transaction successful!");
  console.log("Tx Hash:", receipt.transactionHash);
}

sendTransaction();

import Web3 from "web3";

// Connect to Sepolia via Infura
const web3 = new Web3("https://sepolia.infura.io/v3/18e3c9187d6d4c11a36a76051c3f9b9a");
// Connect to Sepolia via Infura
//const web3 = new Web3("https://sepolia.infura.io/v3/18e3c9187d6d4c11a36a76051c3f9b9a");

async function getTransactionHistory(address, blockCount = 5000) {
  try {
    const latestBlock = await web3.eth.getBlockNumber();
    const transactions = [];

    for (let i = 0; i < blockCount; i++) {
      const blockNumber = Number(latestBlock) - i;
      const block = await web3.eth.getBlock(blockNumber, true);

      if (block && block.transactions) {
        for (const tx of block.transactions) {
          if (
            tx.from?.toLowerCase() === address.toLowerCase() ||
            tx.to?.toLowerCase() === address.toLowerCase()
          ) {
            transactions.push({
              hash: tx.hash,
              blockNumber: tx.blockNumber.toString(),
              from: tx.from,
              to: tx.to || "Contract Creation",
              value: web3.utils.fromWei(tx.value, "ether") + " ETH",
              gasPrice: web3.utils.fromWei(tx.gasPrice.toString(), "gwei") + " Gwei",
              gas: tx.gas.toString(),
              timestamp: new Date(Number(block.timestamp) * 1000).toISOString(),
            });
          }
        }
      }

      if (transactions.length >= 5) break; // limit results
    }

    return transactions;
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    throw error;
  }
}

// Example usage
const address = "0xBD699D332b1EeB550187F96658284657f64B9706";

getTransactionHistory(address, 5000).then((txs) => {
  console.log(`Transactions for ${address}:`);
  console.log(txs);
});

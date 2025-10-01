import Web3 from "web3";

// 🔹 Connect to Sepolia via Infura
const web3 = new Web3("https://sepolia.infura.io/v3/24e32d0fd23c43c9a7b60ecad8f42dee");
// 🔹 Function to fetch block information
async function getBlockInfo(blockNumber = "latest") {
  try {
    const block = await web3.eth.getBlock(blockNumber);

    if (!block) {
      throw new Error(`Block ${blockNumber} not found`);
    }

    return {
      number: block.number?.toString(),
      hash: block.hash,
      parentHash: block.parentHash,
      timestamp: new Date(Number(block.timestamp) * 1000).toISOString(),
      gasLimit: block.gasLimit?.toString(),
      gasUsed: block.gasUsed?.toString(),
      transactionCount: block.transactions.length,
      miner: block.miner,
      baseFeePerGas: block.baseFeePerGas
        ? web3.utils.fromWei(block.baseFeePerGas.toString(), "gwei") + " Gwei"
        : "N/A",
    };
  } catch (error) {
    console.error("Error fetching block info:", error);
    throw error;
  }
}

// 🔹 Example usage
getBlockInfo("latest").then((info) => {
  console.log("Latest block info:");
  console.log(info);
});

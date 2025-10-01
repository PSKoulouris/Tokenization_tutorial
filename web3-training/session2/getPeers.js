import Web3 from "web3";


// Connect to an Ethereum node (here: Sepolia via Infura)
const web3 = new Web3("https://sepolia.infura.io/v3/24e32d0fd23c43c9a7b60ecad8f42dee");

async function runPeerDemo() {
  console.log("=== Web3.js Net.getPeerCount Demo ===\n");

  try {
    const peerCount = await web3.eth.net.getPeerCount();
    console.log("Number of peers connected to this node =", peerCount);
  } catch (err) {
    console.error("Error fetching peer count:", err.message);
  }
}

runPeerDemo();

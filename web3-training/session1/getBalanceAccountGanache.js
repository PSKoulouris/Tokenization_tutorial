//npm install bn.js
// Install: npm install bn.js
import Web3 from "web3";
import BN from "bn.js"; // use bn.js directly

const web3 = new Web3("HTTP://127.0.0.1:7545");

async function runUtilsDemo() {
  console.log("=== Web3.js Utils Demo ===\n");

  // Example: Convert ETH → Wei and Wei → ETH
  const ethValue = "1.5"; 
  const weiValue = web3.utils.toWei(ethValue, "ether");
  console.log(`${ethValue} ETH in Wei = ${weiValue}`);
  const backToEth = web3.utils.fromWei(weiValue, "ether");
  console.log(`${weiValue} Wei in ETH = ${backToEth}\n`);

  // Example: BN math
  const a = new BN("1000000000000000000"); // 1 ETH in wei
  const b = new BN("2000000000000000000"); // 2 ETH in wei
  const sum = a.add(b);  // 3 ETH in wei
  console.log("1 ETH + 2 ETH in Wei =", sum.toString());

  // Example: Compare BN numbers
  const c = new BN("500000000000000000");
  console.log("Is 1 ETH > 0.5 ETH?", a.gt(c));
  console.log("Is 1 ETH < 2 ETH?", a.lt(b), "\n");

  // Example: Fetch live Ganache balance
  const demoAddress = "0x7A191Cc477B57396dd87EBfb8aE1CF1ac08f3216";
  const balanceWei = await web3.eth.getBalance(demoAddress);
  const balanceEth = web3.utils.fromWei(balanceWei, "ether");
  console.log(`Live Ganache balance of ${demoAddress} = ${balanceEth} ETH\n`);
}

runUtilsDemo().catch((err) => console.error("Error in utils demo:", err));

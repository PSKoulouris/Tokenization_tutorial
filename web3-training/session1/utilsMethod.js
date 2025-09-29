/*web3.utils is a collection of helper functions provided by Web3.js to make working with Ethereum data easier. 
Ethereum values are often in raw formats (like wei, hex strings, or big numbers), so these utilities help you convert, 
validate, hash, and manipulate data in a human-friendly way.

How web3.utils is used in practice

Convert ETH to wei before sending a transaction.

Convert wei to ETH when displaying balances to users.

Validate addresses before sending transactions to avoid mistakes.

Generate random nonces or salts for smart contract interactions.

Hash data before signing messages or storing on-chain.

Perform arithmetic with big numbers safely, avoiding JavaScript number overflow.

*/
import Web3 from "web3";

const web3 = new Web3("https://sepolia.infura.io/v3/18e3c9187d6d4c11a36a76051c3f9b9a");

async function runUtilsDemo() {
  console.log("=== Web3.js Utils Demo (v6+) ===\n");

  // Example 1: Convert ETH → Wei and Wei → ETH
  const ethValue = "1.5";
  const weiValue = web3.utils.toWei(ethValue, "ether");
  console.log(`${ethValue} ETH in Wei = ${weiValue}`);

  const backToEth = web3.utils.fromWei(weiValue, "ether");
  console.log(`${weiValue} Wei in ETH = ${backToEth}\n`);

  // Example 2: BN math using native BigInt
  const a = BigInt("1000000000000000000"); // 1 ETH in wei
  const b = BigInt("2000000000000000000"); // 2 ETH in wei
  const sum = a + b;
  console.log("1 ETH + 2 ETH in Wei =", sum.toString());

  // Compare numbers
  const c = BigInt("500000000000000000");
  console.log("Is 1 ETH > 0.5 ETH?", a > c);
  console.log("Is 1 ETH < 2 ETH?", a < b, "\n");

  // Example 3: Fetch live Sepolia balance
  const demoAddress = "0xBD699D332b1EeB550187F96658284657f64B9706";
  const balanceWei = await web3.eth.getBalance(demoAddress);
  const balanceEth = web3.utils.fromWei(balanceWei, "ether");
  console.log(`Live Sepolia balance of ${demoAddress} = ${balanceEth} ETH\n`);

  // Example 4: Address validation
  const valid = "0xBD699D332b1EeB550187F96658284657f64B9706";
  const invalid = "0x1234INVALID";
  console.log(`Is ${valid} a valid address?`, web3.utils.isAddress(valid));
  console.log(`Is ${invalid} a valid address?`, web3.utils.isAddress(invalid), "\n");

  // Example 5: Random hex
  console.log("Random hex (32 bytes):", web3.utils.randomHex(32));

  // Example 6: Keccak256 hash
  const message = "Hello Web3!";
  console.log(`Keccak256("${message}") = ${web3.utils.sha3(message)}`);

  console.log("\n=== Demo Complete ===");
}

runUtilsDemo().catch((err) => console.error("Error in utils demo:", err));

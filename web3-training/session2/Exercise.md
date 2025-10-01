
# Web3.js Beginner Exercises

## Exercise 1: Check Account Balances

**Goal:** Learn how to connect to a blockchain, fetch accounts, and display balances.

### Step 1: Setup

- Start Ganache (local blockchain) or have a Sepolia account + RPC URL.
- Install Web3.js:

```bash
npm install web3 dotenv
```

- Create a `.env` file for Sepolia:

```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
SEPOLIA_PRIVATE_KEY=0xYOUR_PRIVATE_KEY
```

### Step 2: Starter Code

```javascript
import Web3 from "web3";
import dotenv from "dotenv";
dotenv.config();

// Choose network
// Ganache
// const web3 = new Web3("http://127.0.0.1:7545");
// Sepolia
const web3 = new Web3(process.env.SEPOLIA_RPC_URL);

async function main() {
    const accounts = await web3.eth.getAccounts();
    console.log("Accounts:", accounts);

    for (const account of accounts) {
        const balanceWei = await web3.eth.getBalance(account);
        const balanceEth = web3.utils.fromWei(balanceWei, "ether");
        console.log(`Balance of ${account}: ${balanceEth} ETH`);
    }
}

main().catch(console.error);
```

 **Tasks for Students:**
- Run the script and check balances.
- Switch between Ganache and Sepolia.
- Observe balances in ETH instead of Wei.

---

## Exercise 2: Send ETH Between Accounts

**Goal:** Learn how to send ETH and verify balances before and after.

### Step 1: Setup

- Use Ganache accounts or Sepolia testnet accounts.
- Make sure the sending account has ETH.

### Step 2: Starter Code

```javascript
import Web3 from "web3";
import dotenv from "dotenv";
dotenv.config();

// Choose network
// Ganache
// const web3 = new Web3("http://127.0.0.1:7545");
// Sepolia
const web3 = new Web3(process.env.SEPOLIA_RPC_URL);

// Load sender account from private key
const sender = web3.eth.accounts.privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY);
web3.eth.accounts.wallet.add(sender);
web3.eth.defaultAccount = sender.address;

async function main() {
    // Replace with recipient address
    const recipient = "0xRecipientAddressHere";

    // Show balances before transfer
    let senderBalance = await web3.eth.getBalance(sender.address);
    let recipientBalance = await web3.eth.getBalance(recipient);
    console.log(`Before transfer:`);
    console.log(`Sender: ${web3.utils.fromWei(senderBalance, "ether")} ETH`);
    console.log(`Recipient: ${web3.utils.fromWei(recipientBalance, "ether")} ETH`);

    // Send 0.1 ETH
    const tx = await web3.eth.sendTransaction({
        from: sender.address,
        to: recipient,
        value: web3.utils.toWei("0.1", "ether"),
        gas: 21000,
    });

    console.log("Transaction hash:", tx.transactionHash);

    // Show balances after transfer
    senderBalance = await web3.eth.getBalance(sender.address);
    recipientBalance = await web3.eth.getBalance(recipient);
    console.log(`After transfer:`);
    console.log(`Sender: ${web3.utils.fromWei(senderBalance, "ether")} ETH`);
    console.log(`Recipient: ${web3.utils.fromWei(recipientBalance, "ether")} ETH`);
}

main().catch(console.error);
```

 **Tasks for Students:**
- Send ETH between two Ganache accounts first.
- Then try using Sepolia testnet (with `.env`).
- Observe gas costs in balance reduction.

/*
web3.eth.getAccounts():

Returns an array of accounts controlled by the node or wallet you’re connected to.

On Infura or public nodes, this often returns an empty array, because Infura doesn’t manage private keys.
*/ 


import Web3 from "web3";

//Exercise 1: Install ganache to get accounts.

//INFURA do not manage private keys therefore dont return accounts 


//Connect to a local node or testnet (Sepolia via Infura)
const web3 = new Web3("https://sepolia.infura.io/v3/24e32d0fd23c43c9a7b60ecad8f42dee");


//

async function getAccounts() {
  try {
    // Returns an array of accounts controlled by the node/wallet
    const accounts = await web3.eth.getAccounts();

    console.log("Accounts from the node:");
    console.log(accounts);

    // Optionally print the first account
    if (accounts.length > 0) {
      console.log("First account:", accounts[0]);
    } else {
      console.log("No accounts available on this node.");
    }
  } catch (error) {
    console.error("Error fetching accounts:", error);
  }
}

// Run the example
getAccounts();

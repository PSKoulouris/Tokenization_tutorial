//You can generate accounts using web3.eth.accounts.create(). 
// Each account comes with a private key and address.


import Web3 from "web3";

// Connect to Sepolia via Infura
const web3 = new Web3("https://sepolia.infura.io/v3/24e32d0fd23c43c9a7b60ecad8f42dee");

// Create two accounts
const account1 = web3.eth.accounts.create();
const account2 = web3.eth.accounts.create();

console.log("Account 1:", account1);
console.log("Account 2:", account2);

// account1 and account2 contain:
// {
//   address: '0x....',
//   privateKey: '0x....'
// }

console.log("Important: The private key must be kept secret. Anyone with this key can spend funds from the account.")
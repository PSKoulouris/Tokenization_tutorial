/*
## Complile SC with solc 
   create forlder, and name it "contact"
   - Install solc (locally or via npm install solc).    
   - Create a Solidity file, e.g. MyContract.sol.
   - Creat file (see code below) compile.cjs (component of)
     - Output:
        - .bin (bytecode)
        - .abi (Application Binary Interface)

*/

const path = require("path");
const fs = require("fs");
const solc = require("solc");

// Path to contract
const contractPath = path.resolve(__dirname, "MyContract.sol");
const source = fs.readFileSync(contractPath, "utf8");

// Solidity compiler input
const input = {
  language: "Solidity",
  sources: {
    "MyContract.sol": { content: source }
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode"]
      }
    }
  }
};

// Compile
const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Extract contract data
const contractName = Object.keys(output.contracts["MyContract.sol"])[0];
const contract = output.contracts["MyContract.sol"][contractName];

// Ensure build folder exists
const buildDir = path.resolve(__dirname, "build");
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}

// Save ABI and BIN
fs.writeFileSync(
  path.resolve(buildDir, `${contractName}.abi`),
  JSON.stringify(contract.abi, null, 2)
);

fs.writeFileSync(
  path.resolve(buildDir, `${contractName}.bin`),
  contract.evm.bytecode.object
);

console.log(`✅ ${contractName} compiled successfully! ABI & BIN saved in build/`);

import dotenv from "dotenv";
dotenv.config();

console.log("Private key:", process.env.SEPOLIA_PRIVATE_KEY);  // debug

if (!process.env.SEPOLIA_PRIVATE_KEY) {
  throw new Error("SEPOLIA_PRIVATE_KEY not found in .env file");
}
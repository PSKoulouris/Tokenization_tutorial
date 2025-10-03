// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title GoldToken
 * @dev ERC-20 token representing tokenized gold
 * 1 token = 1 gram of gold
 */
contract GoldToken is ERC20, Ownable {
    
    // Price per gram in wei (1 ETH = 1e18 wei)
    uint256 public pricePerGram;
    
    // Total gold reserves in grams
    uint256 public totalGoldReserves;
    
    // Mapping to track purchase history
    mapping(address => uint256) public totalPurchased;
    
    // Events
    event GoldPurchased(address indexed buyer, uint256 amount, uint256 cost);
    event GoldSold(address indexed seller, uint256 amount, uint256 refund);
    event PriceUpdated(uint256 newPrice);
    event GoldReservesAdded(uint256 amount);
    
    constructor(uint256 _initialPrice) ERC20("GoldToken", "GOLD") Ownable(msg.sender) {
        pricePerGram = _initialPrice; // e.g., 0.02 ETH per gram
    }
    
    /**
     * @dev Buy gold tokens with ETH
     */
    function buyGold() external payable {
        require(msg.value > 0, "Must send ETH to buy gold");
        
        uint256 tokensToMint = (msg.value * 1e18) / pricePerGram;
        require(tokensToMint > 0, "Insufficient payment");
        
        _mint(msg.sender, tokensToMint);
        totalGoldReserves += tokensToMint;
        totalPurchased[msg.sender] += tokensToMint;
        
        emit GoldPurchased(msg.sender, tokensToMint, msg.value);
    }
    
    /**
     * @dev Sell gold tokens back for ETH
     */
    function sellGold(uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        require(amount > 0, "Amount must be greater than 0");
        
        uint256 ethToReturn = (amount * pricePerGram) / 1e18;
        require(address(this).balance >= ethToReturn, "Insufficient contract balance");
        
        _burn(msg.sender, amount);
        totalGoldReserves -= amount;
        
        (bool success, ) = msg.sender.call{value: ethToReturn}("");
        require(success, "ETH transfer failed");
        
        emit GoldSold(msg.sender, amount, ethToReturn);
    }
    
    /**
     * @dev Update gold price (owner only)
     */
    function updatePrice(uint256 newPrice) external onlyOwner {
        require(newPrice > 0, "Price must be greater than 0");
        pricePerGram = newPrice;
        emit PriceUpdated(newPrice);
    }
    
    /**
     * @dev Add gold reserves (owner only)
     */
    function addReserves(uint256 amount) external onlyOwner {
        _mint(address(this), amount);
        totalGoldReserves += amount;
        emit GoldReservesAdded(amount);
    }
    
    /**
     * @dev Get user's purchase history
     */
    function getUserPurchaseHistory(address user) external view returns (uint256) {
        return totalPurchased[user];
    }
    
    /**
     * @dev Calculate cost for buying specific amount of gold
     */
    function calculateBuyCost(uint256 gramAmount) external view returns (uint256) {
        return (gramAmount * pricePerGram) / 1e18;
    }
    
    /**
     * @dev Calculate refund for selling specific amount of gold
     */
    function calculateSellRefund(uint256 gramAmount) external view returns (uint256) {
        return (gramAmount * pricePerGram) / 1e18;
    }
    
    /**
     * @dev Withdraw accumulated ETH (owner only)
     */
    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = owner().call{value: balance}("");
        require(success, "Withdrawal failed");
    }
    
    // Fallback to receive ETH
    receive() external payable {}
}
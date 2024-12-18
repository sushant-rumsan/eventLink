const { ethers } = require("ethers");

// Inputs
const msgSender = "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2";
const secretHash = "0xf861eb72cf942a90b9f6cfa87c4988a5cbeb2d9f48e5365bd88dbf63091584dc";

// Compute providedHash
const providedHash = ethers.keccak256(
    ethers.concat([
    secretHash,
    msgSender
    ])
);

console.log("Provided Hash:", providedHash);

console.log("Single Hash is", ethers.keccak256(ethers.toUtf8Bytes("eth")))

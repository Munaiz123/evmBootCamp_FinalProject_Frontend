"use client";

import React, { useState } from "react";
import wheelAbi from "../contracts/Wheel.json";
import { contractAddresses } from "../utils/contracts";
import { useAccount, useWriteContract } from "wagmi";
import StashBalance from "./user/StashBalance";

const Home = () => {
  const { address, isConnected, chain } = useAccount();
  
  const [selectedColor, setSelectedColor] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState("");
  const { writeContract } = useWriteContract();

  const contractAddress = contractAddresses.wheel;

  const onSpinWheel = async () => {
    if (!selectedColor || !betAmount) {
      alert("Please select a color and enter bet amount");
      return;
    }
    try {
      console.log("Calling bet fnc...");
      setIsSpinning(true);
      writeContract({
        abi: wheelAbi.abi,
        address: contractAddress,
        functionName: "bet",
        args: [betAmount, selectedColor],
      });
    } catch (error) {
      console.error("Error spinning the wheel:", error);
    } finally {
      setIsSpinning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5 w-full max-w-2xl">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">Spin The Wheel</span>
          </h1>

          <div className="flex justify-center items-center space-x-2 mb-2">
            <span className="font-mono bg-gray-800 rounded-lg px-2 py-1">
              {isConnected ? "Wallet Connected!": "Connect Wallet to Start Playing"}
            </span>
          </div>

          {/* Game Controls */}
          {isConnected && <div className="flex flex-col items-center gap-6 mb-8">
            {/* Stash Balance */}
            <div className="w-full max-w-xs">
              <StashBalance />
            </div>

            {/* Bet Amount Input */}
            <div className="w-full max-w-xs space-y-2">
              <input
                type="number"
                placeholder="Enter bet amount"
                value={betAmount}
                onChange={e => setBetAmount(e.target.value)}
                className="px-4 py-2 border rounded-lg w-full bg-gray-800 border-gray-700 text-white"
                min="1"
                step="1"
              />
              <p className="text-xs text-gray-400">Minimum bet: 1 LKT</p>
            </div>

            {/* Color Selection */}
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedColor("red")}
                className={`w-24 h-12 rounded-lg ${
                  selectedColor === "red" ? "ring-4 ring-white" : ""
                } bg-red-600 hover:bg-red-700 transition-all`}
              />
              <button
                onClick={() => setSelectedColor("white")}
                className={`w-24 h-12 rounded-lg ${
                  selectedColor === "white" ? "ring-4 ring-red-600" : ""
                } bg-white hover:bg-gray-100 transition-all`}
              />
            </div>

            {/* Color Selection Labels */}
            <div className="flex gap-4 text-sm">
              <span className="w-24 text-center">Red</span>
              <span className="w-24 text-center">White</span>
            </div>

          </div>}

          {/* Wheel Display */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            <div
              className={`w-full h-full rounded-full border-8 border-gray-700 overflow-hidden transform ${
                isSpinning ? "animate-spin" : ""
              }`}
              style={{
                transition: "transform 3s cubic-bezier(0.4, 0, 0.2, 1)",
                backgroundImage:
                  "conic-gradient(red 12.5%, white 12.5% 25%, red 25% 37.5%, white 37.5% 50%, red 50% 62.5%, white 62.5% 75%, red 75% 87.5%, white 87.5%)",
              }}
            />
          </div>

          {/* Spin Button */}
          <div className="flex justify-center">
            <button
              onClick={onSpinWheel}
              disabled={isSpinning || !selectedColor || !betAmount || Number(betAmount) < 1}
              className={`px-6 py-2 rounded-lg bg-blue-600 text-white font-bold
                ${
                  isSpinning || !selectedColor || !betAmount || Number(betAmount) < 1 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:bg-blue-700"
                } transition-all w-48`}
            >
              {isSpinning ? "Spinning..." : "Spin Wheel"}
            </button>
          </div>

          {/* Result Display */}
          {result && !isSpinning && (
            <div className="mt-8 text-center">
              <h2 className="text-2xl font-bold">
                Result: <span className="capitalize">{result}</span>
              </h2>
              <p className="text-xl mt-2">{result === selectedColor ? "You Won! 🎉" : "Try Again! 🎯"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
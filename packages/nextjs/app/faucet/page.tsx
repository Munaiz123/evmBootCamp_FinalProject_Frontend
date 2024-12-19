"use client";

import React, { useState } from "react";
import luckyTokenAbi from "../../contracts/LuckyToken.json";
import { contractAddresses } from "../../utils/contracts";
import { useAccount, useWriteContract } from "wagmi";

const FaucetPage = () => {
  const { address: userAddress, isConnected} = useAccount();

  const [isRequesting, setIsRequesting] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState<Date | null>(null);
  const { writeContract } = useWriteContract();

  const contractAddress = contractAddresses.luckyToken; // Lucky Token Contract Addr

  const onRequestTokens = async () => {
    try {
      setIsRequesting(true);
      console.log("Calling requestTokens...");
      writeContract({
        abi: luckyTokenAbi.abi,
        address: contractAddress,
        functionName: "requestTokens",
      });
      console.log("Finished calling requestTokens...");
    } catch (error) {
      console.error("Error requesting tokens:", error);
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-8">Lucky Token Faucet</h1>

        <div className="bg-gray-800 p-8 rounded-lg">
          <div className="mb-8">
            <h2 className="text-xl mb-4">Request Free Tokens</h2>
            <p className="text-gray-400 mb-6">Get 100 LKT tokens to start playing. Resets every 30 minutes.</p>

            <button
              onClick={onRequestTokens}
              disabled={isRequesting}
              className={`px-8 py-4 rounded-lg text-xl font-bold transition-all
                ${isRequesting ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {isConnected ? (isRequesting ? "Requesting..." : "Hit Me!") : "Connect Wallet to Request Free Tokens"}
            </button>
          </div>

          {lastRequestTime && (
            <div className="text-sm text-gray-400">Last request: {lastRequestTime.toLocaleString()}</div>
          )}
        </div>

        <div className="mt-8 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl mb-4">How It Works</h2>
          <ol className="text-left space-y-4 text-gray-300">
            <li>1. Connect your wallet to receive tokens</li>
            <li>2. Click the "Hit Me!" button above</li>
            <li>3. Confirm the transaction in your wallet</li>
            <li>4. Tokens will be sent to your wallet</li>
            <li>5. Visit User page to transfer tokens to the Game Stash</li>
            <li>6. Use the tokens in your Stash to play games on our platform</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default FaucetPage;

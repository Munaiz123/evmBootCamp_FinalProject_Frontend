// pages/UserPage.tsx
"use client";

import React, { useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { parseUnits } from 'viem';
import luckyTokenAbi from "../../contracts/LuckyToken.json";
import TokenHandlerAbi from "../../contracts/TokenHandler.json";
import { contractAddresses } from "../../utils/contracts";
import WalletBalance from "./WalletBalance";
import StashBalance from "./StashBalance";

const UserPage = () => {
  const { address: userAddress } = useAccount();
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isApproving, setIsApproving] = useState(false);

  // Check allowance
  const { data: allowance } = useReadContract({
    address: contractAddresses.luckyToken,
    abi: luckyTokenAbi.abi,
    functionName: "allowance",
    args: userAddress ? [userAddress, contractAddresses.tokenHandler] : undefined,
  });

  // Write contract hooks
  const { writeContract: approve } = useWriteContract();
  const { writeContract: deposit } = useWriteContract();
  const { writeContract: withdraw } = useWriteContract();

  const handleDeposit = async () => {
    if (!depositAmount || !userAddress) return;

    try {
      const amountInWei = parseUnits(depositAmount, 18);

      if (!allowance || (allowance as bigint) < amountInWei) {
        setIsApproving(true);
        await approve({
          address: contractAddresses.luckyToken,
          abi: luckyTokenAbi.abi,
          functionName: 'approve',
          args: [contractAddresses.tokenHandler, amountInWei],
        });
        setIsApproving(false);
      }

      await deposit({
        address: contractAddresses.tokenHandler,
        abi: TokenHandlerAbi.abi,
        functionName: 'depositWalletToStash',
        args: [amountInWei],
      });

      setDepositAmount("");
    } catch (error) {
      console.error('Deposit error:', error);
      setIsApproving(false);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || !userAddress) return;

    try {
      const amountInWei = parseUnits(withdrawAmount, 18);
      
      await withdraw({
        address: contractAddresses.tokenHandler,
        abi: TokenHandlerAbi.abi,
        functionName: 'withdrawStashToWallet',
        args: [amountInWei],
      });

      setWithdrawAmount("");
    } catch (error) {
      console.error('Withdrawal error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>

        {/* Balance Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <WalletBalance />
          <StashBalance />
        </div>

        {/* Transaction Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Deposit Section */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl mb-4">Deposit to Stash</h2>
            <div className="space-y-4">
              <input
                type="number"
                placeholder="Amount"
                value={depositAmount}
                onChange={e => setDepositAmount(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 rounded"
              />
              <button 
                className="w-full px-4 py-2 bg-green-600 rounded hover:bg-green-700 disabled:bg-gray-600"
                onClick={handleDeposit}
                disabled={isApproving || !depositAmount}
              >
                {isApproving ? 'Approving...' : 'Deposit'}
              </button>
            </div>
          </div>

          {/* Withdraw Section */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl mb-4">Withdraw to Wallet</h2>
            <div className="space-y-4">
              <input
                type="number"
                placeholder="Amount"
                value={withdrawAmount}
                onChange={e => setWithdrawAmount(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 rounded"
              />
              <button 
                className="w-full px-4 py-2 bg-red-600 rounded hover:bg-red-700 disabled:bg-gray-600"
                onClick={handleWithdraw}
                disabled={!withdrawAmount}
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
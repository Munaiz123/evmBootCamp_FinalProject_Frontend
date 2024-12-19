"use client";

import React, { useState, useEffect} from "react";
import luckyTokenAbi from "../../contracts/LuckyToken.json";
import TokenHandlerAbi from "../../contracts/TokenHandler.json";
import { contractAddresses } from "../../utils/contracts";
import { useAccount, useReadContract } from "wagmi";
import { parseUnits, formatUnits } from 'viem';

const UserPage = () => {
  const { address: userAddress } = useAccount();
  
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  
  const [walletBalance, setWalletBalance] = useState<number>(0)
  const [stashBalance, setStashBalance] = useState<number>(0)

  const { data: rawWalletBalance, error:walletError, isLoading:walletLoading } = useReadContract({
    address: contractAddresses.luckyToken,
    abi: luckyTokenAbi.abi,
    functionName: "balanceOf",
    args: userAddress ? [userAddress] : undefined,
  });

  const { data: rawStashBalance, error: stashError, isLoading: stashLoading } = useReadContract({
    address: contractAddresses.tokenHandler, // Replace with your stash contract address
    abi: TokenHandlerAbi.abi, // Replace with your stash contract ABI
    functionName: "getStashBalance",
    args: userAddress ? [userAddress] : undefined,
  });

  useEffect(() => {
    const decimals = 18;
    
    if (rawWalletBalance) {
      const walletBalance = rawWalletBalance as bigint;
      const formattedBalance = walletBalance ? Number(walletBalance) / 10 ** decimals : 0;
      setWalletBalance(formattedBalance);
    }

    if (rawStashBalance) {
      const stashBalance = rawStashBalance as bigint;
      const formattedBalance = stashBalance ? Number(stashBalance) / 10 ** decimals : 0;
      setStashBalance(formattedBalance);
    }

  }, [rawWalletBalance, walletLoading, walletError]);

 

  // Cast rawBalance to bigint if it's defined
  

  // Demo balances - would come from blockchain in real implementation
  const demoWalletBalance = "1000";
  const demoStashBalance = "300";

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>

        {/* Balance Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl mb-2">Wallet Balance</h2>
            <p className="text-2xl font-mono">
              {walletLoading ? "Loading..." : walletError ? `Error: ${walletError.message}` : `${walletBalance} LKT`}
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl mb-2">Stash Balance</h2>
            <p className="text-2xl font-mono">
              {stashLoading ? "Loading..." : stashError ? `Error: ${stashError.message}` : `${stashBalance} LKT`}
            </p>
          </div>
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
              <button className="w-full px-4 py-2 bg-green-600 rounded hover:bg-green-700" onClick={()=> console.log('HELLO DEPOSITING')} >Deposit</button>
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
              <button className="w-full px-4 py-2 bg-red-600 rounded hover:bg-red-700">Withdraw</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;

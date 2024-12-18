"use client";

import React, { useState } from 'react';

const AdminPage = () => {
  const [kittyAmount, setKittyAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const [gameStatus, setGameStatus] = useState(true);

  // Demo balances - would come from blockchain in real implementation
  const demoKittyBalance = "1000000";
  const demoMasterFundBalance = "5000000";
  const toggleGameStatus = () => {
    setGameStatus(prevStatus => !prevStatus);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Game Admin Panel</h1>
        
        {/* Status Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl mb-4">Game Status</h2>
            <div className="flex items-center gap-4">
              <div className={`w-4 h-4 rounded-full ${gameStatus ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span>{gameStatus ? 'Active' : 'Inactive'}</span>
              <button className="ml-auto px-4 py-2 bg-blue-600 rounded hover:bg-blue-700" onClick={toggleGameStatus}>
                {gameStatus ? 'Turn Off' : 'Turn On'}
              </button>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl mb-4">Master Fund Balance</h2>
            <p className="text-2xl font-mono">{demoMasterFundBalance} LKT</p>
          </div>
        </div>

        {/* Kitty Management */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl mb-6">Kitty Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg mb-2">Current Kitty Balance</h3>
              <p className="text-2xl font-mono mb-4">{demoKittyBalance} LKT</p>
              <div className="space-y-4">
                <input
                  type="number"
                  placeholder="Amount"
                  value={kittyAmount}
                  onChange={(e) => setKittyAmount(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded"
                />
                <button className="w-full px-4 py-2 bg-green-600 rounded hover:bg-green-700">
                  Fund Kitty
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-lg mb-2">Withdraw from Kitty</h3>
              <div className="space-y-4">
                <input
                  type="number"
                  placeholder="Amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded"
                />
                <button className="w-full px-4 py-2 bg-red-600 rounded hover:bg-red-700">
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl mb-6">User Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg mb-4">Send Tokens to User</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="User Address"
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded"
                />
                <button className="w-full px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
                  Send Tokens
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-lg mb-4">Ban User</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="User Address"
                  className="w-full px-4 py-2 bg-gray-700 rounded"
                />
                <button className="w-full px-4 py-2 bg-red-600 rounded hover:bg-red-700">
                  Ban User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
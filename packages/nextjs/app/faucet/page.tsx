"use client";

import React, { useState } from 'react';

const FaucetPage = () => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState<Date | null>(null);

  const requestTokens = () => {
    setIsRequesting(true);
    // Simulate token request
    setTimeout(() => {
      setIsRequesting(false);
      setLastRequestTime(new Date());
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-8">Lucky Token Faucet</h1>

        <div className="bg-gray-800 p-8 rounded-lg">
          <div className="mb-8">
            <h2 className="text-xl mb-4">Request Free Tokens</h2>
            <p className="text-gray-400 mb-6">
              Get 100 LKT tokens to start playing. Limited to one request per day.
            </p>
            
            <button
              onClick={requestTokens}
              disabled={isRequesting}
              className={`px-8 py-4 rounded-lg text-xl font-bold transition-all
                ${isRequesting 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {isRequesting ? 'Requesting...' : 'Hit Me!'}
            </button>
          </div>

          {lastRequestTime && (
            <div className="text-sm text-gray-400">
              Last request: {lastRequestTime.toLocaleString()}
            </div>
          )}
        </div>

        <div className="mt-8 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl mb-4">How It Works</h2>
          <ol className="text-left space-y-4 text-gray-300">
            <li>1. Connect your wallet to receive tokens</li>
            <li>2. Click the "Hit Me!" button above</li>
            <li>3. Confirm the transaction in your wallet</li>
            <li>4. Tokens will be sent to your wallet</li>
            <li>5. Use these tokens to play games on our platform</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default FaucetPage;
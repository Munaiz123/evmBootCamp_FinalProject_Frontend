// components/WalletBalance.tsx
import { useAccount, useReadContract } from "wagmi";
import { useState, useEffect } from "react";
import luckyTokenAbi from "../../contracts/LuckyToken.json";
import { contractAddresses } from "../../utils/contracts";

const WalletBalance = () => {
  const { address: userAddress } = useAccount();
  const [walletBalance, setWalletBalance] = useState<number>(0);

  const { data: rawWalletBalance, error: walletError, isLoading: walletLoading } = useReadContract({
    address: contractAddresses.luckyToken,
    abi: luckyTokenAbi.abi,
    functionName: "balanceOf",
    args: userAddress ? [userAddress] : undefined,
  });

  useEffect(() => {
    const decimals = 18;
    
    if (rawWalletBalance) {
      const walletBalance = rawWalletBalance as bigint;
      const formattedBalance = walletBalance ? Number(walletBalance) / 10 ** decimals : 0;
      setWalletBalance(formattedBalance);
    }
  }, [rawWalletBalance]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl mb-2">Wallet Balance</h2>
      <p className="text-2xl font-mono">
        {walletLoading ? "Loading..." : walletError ? `Error: ${walletError.message}` : `${walletBalance} LKT`}
      </p>
    </div>
  );
};

export default WalletBalance;
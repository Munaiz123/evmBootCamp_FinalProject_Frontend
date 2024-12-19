// components/StashBalance.tsx
import { useAccount, useReadContract } from "wagmi";
import { useState, useEffect } from "react";
import TokenHandlerAbi from "../../contracts/TokenHandler.json";
import { contractAddresses } from "../../utils/contracts";

const StashBalance = () => {
  const { address: userAddress, isConnected} = useAccount();
  const [stashBalance, setStashBalance] = useState<number>(0);

  const { data: rawStashBalance, error: stashError, isLoading: stashLoading } = useReadContract({
    address: contractAddresses.tokenHandler,
    abi: TokenHandlerAbi.abi,
    functionName: "getStashBalance",
    args: userAddress ? [userAddress] : undefined,
  });

  useEffect(() => {
    const decimals = 18;
    
    if (rawStashBalance) {
      const stashBalance = rawStashBalance as bigint;
      const formattedBalance = stashBalance ? Number(stashBalance) / 10 ** decimals : 0;
      setStashBalance(formattedBalance);
    }
  }, [rawStashBalance]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl mb-2">Stash Balance</h2>
     {isConnected ? <p className="text-2xl font-mono">
        {stashLoading ? "Loading..." : stashError ? `Error: ${stashError.message}` : `${stashBalance} LKT`}
      </p> : "Connect Wallet to see LKT Balance"}
    </div>
  );
};

export default StashBalance;
import React, { useEffect, useState } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";

const contractAddress1 = "0x300f5ECE2c9D4265C9DA9021582ed1B71F403549";
const contractAddress2 = "0x5275396224FCbCb9Eb1217fc6Fae4B3DDe05A1a2";

export default function BalanceComponent() {
  const [account, setAccount] = useState("0xd0dDF915693f13Cf9B3b69dFF44eE77C901882f8"); // Default address
  const { contract: contract1 } = useContract(contractAddress1);
  const { contract: contract2 } = useContract(contractAddress2);

  const [balance1, setBalance1] = useState(0);
  const [balance2, setBalance2] = useState(0);

  useEffect(() => {
    const fetchBalances = async () => {
      const { data: balanceData1 } = useContractRead(contract1, "balanceOf", [account]);
      const { data: balanceData2 } = useContractRead(contract2, "balanceOf", [account]);
      setBalance1(balanceData1);
      setBalance2(balanceData2);
    };

    const intervalId = setInterval(() => {
      fetchBalances();
    }, 30000); // 30 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [contract1, contract2, account]);

  return (
    <div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
      </div>
      <div>Balance 1: {balance1}</div>
      <div>Balance 2: {balance2}</div>
    </div>
  );
}

    import React, { useState, useEffect } from 'react';
    import { EvmPriceServiceConnection } from "@pythnetwork/pyth-evm-js";

    export default function PythComponent() {
      const _address = "0x300f5ECE2c9D4265C9DA9021582ed1B71F403549";
    const [priceIds, setPriceIds] = useState<string[]>([]);
    const [currentId, setCurrentId] = useState('');
    const [updateData, setUpdateData] = useState<any[]>([]);

    useEffect(() => {
        const updatePriceFeed = async () => {
        const connection = new EvmPriceServiceConnection("https://xc-testnet.pyth.network");

        if(priceIds.length > 0) {
            const data = await connection.getPriceFeedsUpdateData([_address]);
            setUpdateData(data);
        }
        }

        updatePriceFeed();
    }, [_address]);

    const addPriceId = () => {
        setPriceIds([...priceIds, currentId]);
        setCurrentId('');
    }

    return (
        <div>
        <input type="text" value={currentId} onChange={e => setCurrentId(e.target.value)} placeholder="Enter price ID" />
        <button onClick={addPriceId}>Add</button>
        {updateData.length > 0 && (
            <div>
            <h3>Updated Data:</h3>
            <pre>{JSON.stringify(updateData, null, 2)}</pre>
            </div>
        )}
        </div>
    );
    }

/*
    import { Web3Button } from "@thirdweb-dev/react";

export default function Component() {
  return (
    <Web3Button
      contractAddress="0x5275396224FCbCb9Eb1217fc6Fae4B3DDe05A1a2"
      action={(contract) => {
        contract.call("getPrice", [1, exp, _updateData])
      }}
    >
      getPrice
    </Web3Button>
  )
}
*/

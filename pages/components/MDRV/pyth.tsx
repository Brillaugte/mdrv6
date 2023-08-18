    import React, { useState, useEffect } from 'react';
    import { EvmPriceServiceConnection } from "@pythnetwork/pyth-evm-js";
    import AssetSelector from './AssetSelector';

    export default function PythComponent() {
    const [priceIds, setPriceIds] = useState<string[]>([]);
    const [currentId, setCurrentId] = useState('');
    const [updateData, setUpdateData] = useState<any[]>([]);

    useEffect(() => {
        const updatePriceFeed = async () => {
        const connection = new EvmPriceServiceConnection("https://xc-testnet.pyth.network");

        if(priceIds.length > 0) {
            const data = await connection.getPriceFeedsUpdateData(priceIds);
            setUpdateData(data);
        }
        }

        updatePriceFeed();
    }, [priceIds]);

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

    /* import { useContract, useContractWrite } from "@thirdweb-dev/react";
    import React, { useState, useEffect } from 'react';
    import {EvmPriceServiceConnection} from "@pythnetwork/pyth-evm-js";

    export default function PythComponent() {
        const [priceIds, setPriceIds] = useState<string[]>([]);
        const [currentId, setCurrentId] = useState('');
        const [updateData, setUpdateData] = useState<any[]>([]);
        const [result, setResult] = useState<string | null>(null);
        //0x0657b7adF88a4B4dee7E42f325718c2A32cd2b9C
        const { contract } = useContract("0xff1a0f4744e8582DF1aE09D5611b887B6a12925C");
        const { mutateAsync: updatePriceFeeds, isLoading } = useContractWrite(contract, "updatePriceFeeds");

        useEffect(() => {
            const updatePriceFeed = async () => {
                const connection = new EvmPriceServiceConnection("https://xc-testnet.pyth.network");
                
                if(priceIds.length > 0){
                    const data = await connection.getPriceFeedsUpdateData(priceIds);
                    setUpdateData(data);
                }
            }
        
            updatePriceFeed();
        }, [priceIds]);

        const call = async () => {
            try {
            const data = await updatePriceFeeds({ args: [updateData] });
            console.info("contract call success", data);
            setResult('Success');
            } catch (err) {
            console.error("contract call failure", err);
            setResult('Failure');
            }
        }

        const addPriceId = () => {
            setPriceIds([...priceIds, currentId]);
            setCurrentId('');
        }

        return (
            <div>
                <input type="text" value={currentId} onChange={e => setCurrentId(e.target.value)} placeholder="Enter price ID" />
                <button onClick={addPriceId}>Add</button>
                <button disabled={isLoading || !updateData.length} onClick={call}>Call Contract</button>
                {result && <p>{result}</p>}
            </div>
        );
    }
    */
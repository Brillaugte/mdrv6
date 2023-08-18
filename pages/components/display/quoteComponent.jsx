import React, { useState } from "react";
import { useContractEvents, useContract } from "@thirdweb-dev/react";


export default function QuoteDisplayComponent() {
  const [address, setAddress] = useState("0xd0dDF915693f13Cf9B3b69dFF44eE77C901882f8");
  const contract = '0x5275396224FCbCb9Eb1217fc6Fae4B3DDe05A1a2'

  const { data: dataA, isLoading: isLoadingA, error: errorA } = useContractEvents(
    contract,
    "Quote",
    {
      queryFilter: {
        filters: {
          p_A: address,
        },
      },
      subscribe: true,
    },
  );

  const { data: dataB, isLoading: isLoadingB, error: errorB } = useContractEvents(
    contract,
    "Quote",
    {
      queryFilter: {
        filters: {
          p_B: address,
        },
      },
      subscribe: true,
    },
  );

  const isLoading = isLoadingA || isLoadingB;
  const error = errorA || errorB;
  const data = [...(dataA || []), ...(dataB || [])];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const ids = data.map(event => event.data.c_id);

  return (
    <div>
      <input
        type="text"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      {ids.map(id => (
        <div key={id}>{id}</div>
      ))}
    </div>
  );
}

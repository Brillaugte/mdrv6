import { useContractEvents, useContract } from "@thirdweb-dev/react";

const contractAddress = "{{contract_address}}"; // Replace with your smart contract address

export default function quoteDisplayComponent() {
  const { contract } = useContract(contractAddress);
  const { data, isLoading, error } = useContractEvents(
    contract,
    "Quote",
    {
      queryFilter: {
        filters: {
          p_A: "0xd0dDF915693f13Cf9B3b69dFF44eE77C901882f8", // Replace with the specific address you're interested in
        },
      },
      subscribe: true,
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const ids = data.map(event => event.data.c_id);

  return (
    <div>
      {ids.map(id => (
        <div key={id}>{id}</div>
      ))}
    </div>
  );
}

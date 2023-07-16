import { useChain } from "@cosmos-kit/react";
import { useState } from "react";
import { chainName, coin } from 'config';
import { Contracts } from '@cosmwasm/ts-codegen';

const chainNames = ["aura", "euphoria"];

export default () => {
  const [contractAddress, setContractAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [owner, setOwner] = useState("");
  const [tokenUri, setTokenUri] = useState("");
  const [extension, setExtension] = useState("");

  const { address, getSigningCosmWasmClient } = useChain(chainNames[0]);

  const handleMint = async () => {
    if (!address || !contractAddress) return;

    try {
      const signingCosmWasmClient = await getSigningCosmWasmClient();
      const { Cw721BaseMessageComposer } = Contracts.Cw721Base;
      const cw721BaseMessageComposer = new Cw721BaseMessageComposer(
        address,
        contractAddress
      );

      const msgs = cw721BaseMessageComposer.mint({
        token_id: tokenId,
        owner,
        token_uri,
        extension,
      });

      await signingCosmWasmClient.signAndBroadcast(msgs);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h4>Interact with CosmWasm Smart Contract</h4>
      <div>
        <label>Contract Address:</label>
        <input
          type="text"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        />
      </div>
      <div>
        <label>Token ID:</label>
        <input
          type="text"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
      </div>
      <div>
        <label>Owner:</label>
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
      </div>
      <div>
        <label>Token URI:</label>
        <input
          type="text"
          value={tokenUri}
          onChange={(e) => setTokenUri(e.target.value)}
        />
      </div>
      <div>
        <label>Extension:</label>
        <input
          type="text"
          value={extension}
          onChange={(e) => setExtension(e.target.value)}
        />
      </div>
      <button onClick={handleMint}>Mint</button>
    </div>
  );
};

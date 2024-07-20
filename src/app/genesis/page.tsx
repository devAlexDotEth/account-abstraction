// src/app/gasless/page.tsx

"use client";
import React, { useEffect, useState } from "react";
import { balanceOf, claimTo, getNFT } from "thirdweb/extensions/erc1155";
import {
  ConnectButton,
  MediaRenderer,
  TransactionButton,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import { accountAbstraction, client, editionDropContract, editionDropTokenIds } from "../constants";
import Link from "next/link";

const GenesisHome: React.FC = () => {
  const smartAccount = useActiveAccount();
  const [loadedNfts, setLoadedNfts] = useState<any[]>([]);
  const [ownedNfts, setOwnedNfts] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNfts = async () => {
      const nftPromises = editionDropTokenIds.map((tokenId) =>
        getNFT({ contract: editionDropContract, tokenId }).catch(() => null)
      );
      const nfts = await Promise.all(nftPromises);
      setLoadedNfts(nfts.filter((nft) => nft !== null));

      if (smartAccount) {
        const ownedNftPromises = editionDropTokenIds.map(async (tokenId) => {
          const balance = await balanceOf({
            contract: editionDropContract,
            owner: smartAccount.address,
            tokenId,
          }).catch(() => 0n);
          return { tokenId, balance };
        });
        const owned = await Promise.all(ownedNftPromises);
        const ownedNftMap = owned.reduce((acc, { tokenId, balance }) => {
          acc[tokenId.toString()] = balance;
          return acc;
        }, {} as Record<string, any>);
        setOwnedNfts(ownedNftMap);
      }

      setLoading(false);
    };

    fetchNfts();
  }, [smartAccount]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-12 text-zinc-100">
        Genesis Drop
      </h1>
      <ConnectButton
        client={client}
        //accountAbstraction={accountAbstraction}
        connectModal={{
          size: "compact",
        }}
      />

      <div className="flex flex-wrap justify-center space-x-10 mt-8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          loadedNfts.map((nft, index) => {
            const tokenId = editionDropTokenIds[index];
            const ownedQuantity = ownedNfts[tokenId.toString()]?.toString() || "0";

            return (
              <div key={index} className="flex flex-col items-center m-4">
                <MediaRenderer client={client} src={nft.metadata.image} style={{ width: "100%", marginTop: "10px" }} />
                <p className="font-semibold text-center mb-2">
                  You own {ownedQuantity} Digital Genesis {tokenId.toString()}
                </p>
                <TransactionButton
                  transaction={() =>
                    claimTo({
                      contract: editionDropContract,
                      tokenId,
                      to: smartAccount?.address!,
                      quantity: 1n,
                    })
                  }
                  onError={(error) => {
                    alert(`Error: ${error.message}`);
                  }}
                  onTransactionConfirmed={async () => {
                    alert("Claim successful!");
                    // Refresh the ownership data after a successful claim
                    const balance = await balanceOf({
                      contract: editionDropContract,
                      owner: smartAccount?.address!,
                      tokenId,
                    }).catch(() => 0n);
                    setOwnedNfts((prev) => ({
                      ...prev,
                      [tokenId.toString()]: balance,
                    }));
                  }}
                >
                  Claim!
                </TransactionButton>
              </div>
            );
          })
        )}
      </div>

      <Link href={"/"} className="text-sm text-gray-400 mt-8">
        Back to menu
      </Link>
    </div>
  );
};

export default GenesisHome;
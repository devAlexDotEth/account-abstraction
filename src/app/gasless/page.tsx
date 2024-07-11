"use client";
import React, { useState, useEffect } from "react";
import { claimTo, getNFT, getOwnedNFTs } from "thirdweb/extensions/erc1155";
import {
    ConnectButton,
    MediaRenderer,
    TransactionButton,
    useActiveAccount,
} from "thirdweb/react";
import {
    accountAbstraction,
    client,
    editionDropContract,
    editionDropTokenIds, // Array of token IDs
} from "../constants";
import Link from "next/link";

const GaslessHome: React.FC = () => {
    const smartAccount = useActiveAccount();
    const [loadedNfts, setLoadedNfts] = useState<any[]>([]);
    const [ownedNfts, setOwnedNfts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNfts = async () => {
            const nftPromises = editionDropTokenIds.map(tokenId =>
                getNFT({ contract: editionDropContract, tokenId }).catch(() => null)
            );
            const nfts = await Promise.all(nftPromises);
            setLoadedNfts(nfts.filter(nft => nft !== null));

            if (smartAccount) {
                const ownedNftPromises = editionDropTokenIds.map(tokenId =>
                    getOwnedNFTs({ contract: editionDropContract, address: smartAccount.address }).catch(() => null)
                );
                const owned = await Promise.all(ownedNftPromises);
                setOwnedNfts(owned);
            }

            setLoading(false);
        };
        fetchNfts();
    }, [smartAccount]);

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-12 text-zinc-100">
                FREE Mints
            </h1>
            <ConnectButton
                client={client}
                //accountAbstraction={accountAbstraction}
                connectModal={{
                    size: "compact",
                }}
            />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="flex flex-wrap justify-center space-x-10 mt-8">
                    {loadedNfts.map((nft, index) => {
                        const tokenId = editionDropTokenIds[index];

                        return (
                            <div key={index} className="flex flex-col items-center m-4">
                                <MediaRenderer
                                    client={client}
                                    src={nft.metadata.image}
                                    style={{ width: "100%", marginTop: "10px" }}
                                />
                                {smartAccount ? (
                                    <>
                                        <p className="font-semibold text-center mb-2">
                                            You own {ownedNfts[index]?.[0]?.quantityOwned.toString() || "0"}{" "}
                                            Digital Genesis {index}
                                        </p>
                                        <TransactionButton
                                            transaction={() =>
                                                claimTo({
                                                    contract: editionDropContract,
                                                    tokenId,
                                                    to: smartAccount.address,
                                                    quantity: 1n,
                                                })
                                            }
                                            onError={(error) => {
                                                alert(`Error: ${error.message}`);
                                            }}
                                            onTransactionConfirmed={async () => {
                                                alert("Claim successful!");
                                            }}
                                        >
                                            Claim!
                                        </TransactionButton>
                                    </>
                                ) : (
                                    <p
                                        style={{
                                            textAlign: "center",
                                            width: "100%",
                                            marginTop: "10px",
                                        }}
                                    >
                                        Login to claim this Digital Genesis {index} Drop!
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            <Link href={"/"} className="text-sm text-gray-400 mt-8">
                Back to menu
            </Link>
        </div>
    );
};

export default GaslessHome;
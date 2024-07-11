"use client";
import type React from "react";
import { claimTo, getNFT, getOwnedNFTs } from "thirdweb/extensions/erc1155";
import {
    ConnectButton,
    MediaRenderer,
    TransactionButton,
    useActiveAccount,
    useReadContract,
} from "thirdweb/react";
import {
    accountAbstraction,
    client,
    editionDropContract1,
    editionDropTokenIds, // Array of token IDs
} from "../constants";
import Link from "next/link";

const GaslessHome: React.FC = () => {
    const smartAccount = useActiveAccount();

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
            <div className="flex flex-wrap justify-center space-x-10 mt-8">
                {editionDropTokenIds.map((tokenId, index) => {
                    const { data: nft, isLoading: isNftLoading } = useReadContract(getNFT, {
                        contract: editionDropContract1,
                        tokenId,
                    });
                    const { data: ownedNfts } = useReadContract(getOwnedNFTs, {
                        contract: editionDropContract1,
                        address: smartAccount?.address!,
                        queryOptions: { enabled: !!smartAccount },
                    });

                    return (
                        <div key={index} className="flex flex-col items-center m-4">
                            {isNftLoading ? (
                                <div className="w-full mt-24">Loading...</div>
                            ) : (
                                nft && (
                                    <>
                                        <MediaRenderer
                                            client={client}
                                            src={nft.metadata.image}
                                            style={{ width: "100%", marginTop: "10px" }}
                                        />
                                        {smartAccount ? (
                                            <>
                                                <p className="font-semibold text-center mb-2">
                                                    You own {ownedNfts?.[0]?.quantityOwned.toString() || "0"}{" "}
                                                    Digital Genesis {index}
                                                </p>
                                                <TransactionButton
                                                    transaction={() =>
                                                        claimTo({
                                                            contract: editionDropContract1,
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
                                    </>
                                )
                            )}
                        </div>
                    );
                })}
            </div>

            <Link href={"/"} className="text-sm text-gray-400 mt-8">
                Back to menu
            </Link>
        </div>
    );
};

export default GaslessHome;
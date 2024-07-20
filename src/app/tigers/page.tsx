"use client";
import React from "react";
import { balanceOf, claimTo, getNFT } from "thirdweb/extensions/erc1155";
import {
    ConnectButton,
    MediaRenderer,
    TransactionButton,
    useActiveAccount,
    useReadContract,
} from "thirdweb/react";
import { accountAbstraction, client } from "../constants";
import Link from "next/link";
import { base } from "thirdweb/chains";
import { ThirdwebContract, getContract } from "thirdweb";

const TigersHome: React.FC = () => {
    const smartAccount = useActiveAccount();

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-center text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-12 text-zinc-100">
                We Are Tigers (Phase 1 Demo Option2)
                <br />
            </h1>
            <ConnectButton
                client={client}
                //accountAbstraction={accountAbstraction}
                connectModal={{
                    size: "compact",
                }}
            />

            <div className="flex flex-row">
                <NFTClaimer
                    receiverAddress={smartAccount?.address}
                    dropContract={getContract({
                        address: "0x79F07c16a7B3DC8a75F5032e5d86092deD2BcAC2",
                        chain: base,
                        client,
                    })}
                    tokenId={0n}
                />
                <div className="h-auto w-[1px] bg-gray-600 mx-12 mt-8" />
                <NFTClaimer
                    receiverAddress={smartAccount?.address}
                    dropContract={getContract({
                        address: "0x79F07c16a7B3DC8a75F5032e5d86092deD2BcAC2",
                        chain: base,
                        client,
                    })}
                    tokenId={1n}
                />
            </div>
            <div className="flex flex-row">
                <NFTClaimer
                    receiverAddress={smartAccount?.address}
                    dropContract={getContract({
                        address: "0x79F07c16a7B3DC8a75F5032e5d86092deD2BcAC2",
                        chain: base,
                        client,
                    })}
                    tokenId={2n}
                />
                <div className="h-auto w-[1px] bg-gray-600 mx-12 mt-8" />
                <NFTClaimer
                    receiverAddress={smartAccount?.address}
                    dropContract={getContract({
                        address: "0x79F07c16a7B3DC8a75F5032e5d86092deD2BcAC2",
                        chain: base,
                        client,
                    })}
                    tokenId={3n}
                />
            </div>
            <div className="flex flex-row">
                <NFTClaimer
                    receiverAddress={smartAccount?.address}
                    dropContract={getContract({
                        address: "0x79F07c16a7B3DC8a75F5032e5d86092deD2BcAC2",
                        chain: base,
                        client,
                    })}
                    tokenId={4n}
                />
            </div>

            <Link href={"/"} className="text-sm text-gray-400 mt-8">
                Back to menu
            </Link>
        </div>
    );
};

type NFTClaimerProps = {
    receiverAddress?: string;
    dropContract: ThirdwebContract;
    tokenId: bigint;
};

const NFTClaimer: React.FC<NFTClaimerProps> = (props: NFTClaimerProps) => {
    const { data: nft, isLoading: isNftLoading } = useReadContract(getNFT, {
        contract: props.dropContract,
        tokenId: props.tokenId,
    });
    const { data: ownedNfts } = useReadContract(balanceOf, {
        contract: props.dropContract,
        owner: props.receiverAddress!,
        tokenId: props.tokenId,
        queryOptions: { enabled: !!props.receiverAddress },
    });
    return (
        <div className="flex flex-col my-8">
            {isNftLoading ? (
                <div className="w-full mt-24">Loading...</div>
            ) : (
                <>
                    {nft ? (
                        <MediaRenderer client={client} src={nft.metadata.image} />
                    ) : null}
                    {props.receiverAddress ? (
                        <>
                            <p className="font-semibold text-center my-2">
                                You own {ownedNfts?.toString() || "0"} Digital Genesis{" "}
                                {props.dropContract.chain.name}
                            </p>
                            <TransactionButton
                                transaction={() =>
                                    claimTo({
                                        contract: props.dropContract,
                                        tokenId: props.tokenId,
                                        to: props.receiverAddress!,
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
                        <p className="text-center mt-8">
                            Login to claim Digital Genesis on {props.dropContract.chain.name}!
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default TigersHome;
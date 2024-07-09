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
import { accountAbstraction, client, editionDropTokenId } from "../constants";
import Link from "next/link";
import { sepolia, base } from "thirdweb/chains";
import { ThirdwebContract, getContract } from "thirdweb";

const GaslessHome: React.FC = () => {
	const smartAccount = useActiveAccount();

	return (
		<div className="flex flex-col items-center">
			<h1 className="text-center text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-12 text-zinc-100">
				Multichain
				<br />
				Sponsored Transactions
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
						address: "0x4cc9192572D4C6D4721FD13AbEa363d3274aDA92",
						chain: sepolia,
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
					tokenId={0n}
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
								You own {ownedNfts?.toString() || "0"} Tigers on{" "}
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
							Login to claim this Tiger on {props.dropContract.chain.name}!
						</p>
					)}
				</>
			)}
		</div>
	);
};

export default GaslessHome;

import { createThirdwebClient, getContract } from "thirdweb";
import { base, baseSepolia } from "thirdweb/chains";
import { SmartWalletOptions } from "thirdweb/wallets";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = "95d1288f8cb4a1a420a4739f0886ed62";

if (!clientId) {
	throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
	clientId: clientId,
});

export const chain = base;
export const tokenDropAddress = "0xd64A548A82c190083707CBEFD26958E5e6551D18";
export const editionDropAddress = "0x79F07c16a7B3DC8a75F5032e5d86092deD2BcAC2";
export const editionDropTokenId = 0n;

export const editionDropContract = getContract({
	address: editionDropAddress,
	chain,
	client,
});

export const tokenDropContract = getContract({
	address: tokenDropAddress,
	chain,
	client,
});

export const accountAbstraction: SmartWalletOptions = {
	chain,
	sponsorGas: true,
};

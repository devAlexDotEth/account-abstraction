import { createThirdwebClient, getContract } from "thirdweb";
import { base, baseSepolia, ethereum } from "thirdweb/chains";
import { SmartWalletOptions } from "thirdweb/wallets";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;

if (!clientId) {
    throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
    clientId: clientId,
});

export const chain = base;
export const accountFactoryAddress = "0x34562c58F8430A25b724Be814Af5cc3482080d51";
export const tokenDropAddress = "0xd64A548A82c190083707CBEFD26958E5e6551D18";
export const editionDropAddress = "0x79F07c16a7B3DC8a75F5032e5d86092deD2BcAC2";
export const editionDropAddress2 = "";

export const editionDropTokenIds = Array.from({ length: 5 }, (_, i) => BigInt(i)); // Adjust length as needed
export const editionDropTokenIds2 = Array.from({ length: 0 }, (_, i) => BigInt(i)); // Adjust length as needed


export const accountFactoryContract = getContract({
    address: accountFactoryAddress,
    chain,
    client,
});

export const editionDropContract = getContract({
    address: editionDropAddress,
    chain,
    client,
});

export const editionDropContract1 = getContract({
    address: editionDropAddress,
    chain,
    client,
});

export const editionDropContract2 = getContract({
    address: editionDropAddress2,
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
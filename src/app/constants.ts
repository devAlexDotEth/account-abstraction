import { createThirdwebClient, getContract } from "thirdweb";
import { base, baseSepolia, ethereum } from "thirdweb/chains";
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
export const accountFactoryAddress = "0x90494E880716692ff019805b0C59D1f8f3838F06";
export const tokenDropAddress = "0xd64A548A82c190083707CBEFD26958E5e6551D18";
export const editionDropAddress = "0x7f5EE10f182060a881FA8467FADca3cE87267868";
export const editionDropAddress2 = "";

export const editionDropTokenIds = Array.from({ length: 4 }, (_, i) => BigInt(i)); // Adjust length as needed
export const editionDropTokenIds2 = Array.from({ length: 4 }, (_, i) => BigInt(i)); // Adjust length as needed


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
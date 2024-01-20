import {Mnemonic} from "@multiversx/sdk-wallet";
import { IAccountBalance } from "@multiversx/sdk-core/out";

export function getBlockchainKeys(userInputMnemonic: string) {
  const mnemonic = Mnemonic.fromString(userInputMnemonic);
  const addressIndex = 0;

  const secretKey = mnemonic.deriveKey(addressIndex);
  const publicKey = secretKey.generatePublicKey();

  return {
    secretKey,
    publicKey
  }
}

export function getBlockchainWalletAddress(userInputMnemonic: string) {
  try {
    const { publicKey } = getBlockchainKeys(userInputMnemonic);
    return publicKey.toAddress().toString();
  } catch (error) {
    console.error(error);
  }
}

export const formatBalance = (balance: IAccountBalance | undefined) => {
  if (balance === undefined) return;
  const divisor = 10**18;
  const formattedBalance = Number(balance) / divisor;
  return formattedBalance.toFixed(2);
}

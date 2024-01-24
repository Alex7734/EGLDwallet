import {Mnemonic} from "@multiversx/sdk-wallet";
import { IAccountBalance, IAddress } from "@multiversx/sdk-core/out";
import { UserPublicKey, UserSecretKey } from "@multiversx/sdk-wallet/out";

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

function hexToUint8Array(hexString: string) {
  if (hexString.length % 2 !== 0) {
    throw new Error("Invalid hex string");
  }

  const arrayBuffer = new Uint8Array(hexString.length / 2);

  for (let i = 0; i < hexString.length; i += 2) {
    const byteValue = parseInt(hexString.substring(i, i + 2), 16);
    if (isNaN(byteValue)) {
      throw new Error("Invalid hex string");
    }
    arrayBuffer[i / 2] = byteValue;
  }

  return arrayBuffer;
}

export function getSecretKeyFromHex(hexString: string) {
  const uint8Array = hexToUint8Array(hexString);
  return new UserSecretKey(uint8Array);
}

export function getPublicKeyFromHex(hexString: string) {
  const uint8Array = hexToUint8Array(hexString);
  return new UserPublicKey(uint8Array);
}

export function stringToIAddress(addressString: string): IAddress {
  return {
    bech32: () => addressString
  };
}

export function createTransactionFromHex(hexString: string) {
  return {
    getHash: () => ({
      hex: () => hexString
    })
  };
}
export const formatBalance = (balance: IAccountBalance | undefined) => {
  if (balance === undefined) return;
  const divisor = 10**18;
  const formattedBalance = Number(balance) / divisor;
  return formattedBalance.toFixed(2);
}

export const isValidMnemonicFormat = (mnemonic: string) => {
  try {
    Mnemonic.fromString(mnemonic);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

import { RootState } from "@store/store";
import { getBlockchainKeys, getPublicKeyFromHex, getSecretKeyFromHex } from "@wallet/helpers/wallet.utils";
import { createSelector } from "@reduxjs/toolkit";
import { TEST_PASSWORD } from "@constants/api.constants";
import { UserWallet } from "@multiversx/sdk-wallet/out";


export const selectWalletMnemonic = (state: RootState) => state.wallet.mnemonic;

export const walletKeysSelector = createSelector(
  [selectWalletMnemonic],
  (mnemonic) => {
    const keys = getBlockchainKeys(mnemonic);
    return {
      publicKeyHex: keys.publicKey.hex(),
      secretKeyHex: keys.secretKey.hex(),
    };
  }
);

export const userWalletSelector = createSelector(
  [walletKeysSelector],
  (walletKeys) => {
    return UserWallet.fromSecretKey({
      secretKey: getSecretKeyFromHex(walletKeys.secretKeyHex),
      password: TEST_PASSWORD
    });
  }
);

export const walletAddressSelector = createSelector(
  [walletKeysSelector],
  (walletKeys) => {
    return getPublicKeyFromHex(walletKeys.publicKeyHex).toAddress().toString();
  }
);

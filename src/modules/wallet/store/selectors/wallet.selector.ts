import { RootState } from "@store/store";
import { getBlockchainKeys } from "@wallet/helpers/wallet.utils";
import { createSelector } from "@reduxjs/toolkit";

const selectMnemonic = (state: RootState) => state.wallet.mnemonic;

export const selectBlockchainKeys = createSelector(
  [selectMnemonic],
  (mnemonic: string) => {
    if (mnemonic) {
      return getBlockchainKeys(mnemonic);
    }
    return { secretKey: null, publicKey: null };
  }
);

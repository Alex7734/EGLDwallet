import { RootState } from "@store/store";
import { getSecretKeyFromHex } from "@wallet/helpers/wallet.utils";
import { createSelector } from "@reduxjs/toolkit";
import { TEST_PASSWORD } from "@constants/api.constants";
import { UserWallet } from "@multiversx/sdk-wallet/out";

const selectSecretKeyHex = (state: RootState) => state.wallet.keys.secretKeyHex;

export const getUserWallet = createSelector(
  selectSecretKeyHex,
  (secretKeyHex) => {
    if (!secretKeyHex) return null;

    return UserWallet.fromSecretKey({
      secretKey: getSecretKeyFromHex(secretKeyHex),
      password: TEST_PASSWORD
    });
  }
);

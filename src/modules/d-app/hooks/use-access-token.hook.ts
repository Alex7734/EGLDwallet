import { useCallback } from "react";
import { NativeAuthClient } from "@multiversx/sdk-native-auth-client";
import { TEST_PASSWORD } from "@constants/api.constants";
import { useSelector } from "react-redux";
import { userWalletSelector, walletAddressSelector } from "@wallet/store/selectors/wallet.selector";
import { UserSigner } from "@multiversx/sdk-wallet/out";

export const useAccessToken = () => {
  const userWallet = useSelector(userWalletSelector);
  const walletAddress = useSelector(walletAddressSelector);
  const client = new NativeAuthClient();

  const getAccessToken = useCallback(async () => {
    if (userWallet == null) return;
    const init = await client.initialize();
    const messageToSign = `${walletAddress}${init}`;
    const signer = UserSigner.fromWallet(userWallet.toJSON(), TEST_PASSWORD);
    const buffer = Buffer.from(messageToSign, 'utf-8');
    const signature = await signer.sign(buffer);
    const convertedSignature = signature.toString('hex');
    return client.getToken(walletAddress, init, convertedSignature);
  }, [walletAddress, userWallet]);

  return { getAccessToken };
};

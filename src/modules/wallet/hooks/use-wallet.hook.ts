import { useDispatch, useSelector } from 'react-redux';
import { setMnemonics } from '@wallet/store/wallet.slice';
import { useEffect, useState } from "react";
import { fetchAccountData, fetchAccountTransactions } from "@wallet/store/thunks/featch-account-data.thunk";
import { AppDispatch, RootState } from "@store/store";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AppNavigatorRoutes, AppNavigatorParamList } from "@navigation/routes/app-navigator-routes";

export const useWalletHook = () => {
  const [isAccountDataLoading, setIsAccountDataLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const wallet = useSelector((state: RootState) => state.wallet);
  const walletAddress = useSelector((state: RootState) => state.wallet.walletAddress);
  const navigation = useNavigation<NavigationProp<AppNavigatorParamList>>();

  const importWallet = (words: string) => {
    dispatch(setMnemonics(words));
  };

  useEffect(() => {
    if (!walletAddress) return;
    setIsAccountDataLoading(true)
    dispatch(fetchAccountData(walletAddress));
    dispatch(fetchAccountTransactions(walletAddress));
    }, [walletAddress]);

  useEffect(() => {
    setIsAccountDataLoading(false);
    if (!wallet.accountData) return;
    navigation.navigate(AppNavigatorRoutes.WalletApp);
  }, [wallet.accountData])

  return { ...wallet, isAccountDataLoading, importWallet };
};

export default useWalletHook;

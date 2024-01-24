import { useForm, UseFormReturn } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendTransactionData, sendTransactionSchema } from "@wallet/schemas/wallet.schema";
import { useSendTransactionMutation } from "@wallet/store/apis/api.service";
import { userWalletSelector } from "@wallet/store/selectors/wallet.selector";
import { setLatestTransactionData } from "@wallet/store/wallet.slice";
import { WalletParamList, WalletRoutes } from "@wallet/navigation/routes/wallet-routes";
import { Keyboard } from "react-native";
import { AppDispatch, RootState } from "@store/store";

export interface UseSendTransactionFormReturnType {
  form: UseFormReturn<SendTransactionData>
  handleSubmit: (transactionData: SendTransactionData) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
}

export const useSendTransactionForm = (): UseSendTransactionFormReturnType => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<WalletParamList>>();
  const [sendTransaction, { isLoading, isError }] = useSendTransactionMutation();
  const accountData = useSelector((state: RootState) => state.wallet.accountData);
  const userWallet = useSelector(userWalletSelector);

  const form = useForm<SendTransactionData>({
    resolver: zodResolver(sendTransactionSchema),
  });

  const handleSubmit = async (transactionData: SendTransactionData) => {
    Keyboard.dismiss();
    if (accountData == null || userWallet == null) return;
    try {
      const transactionHash = await sendTransaction({ transactionData, accountData, userWallet }).unwrap();

      const transactionInformation = {
        amount: transactionData.amount,
        receiverAddress: transactionData.address.bech32(),
        txHash: transactionHash,
        didRefetch: false,
      };

      navigation.reset({
        index: 0,
        routes: [{ name: WalletRoutes.SuccessTransaction, params: { transactionInformation } }],
      });

      dispatch(setLatestTransactionData(transactionInformation));
    } catch (error) {
      console.error('Error sending transaction', error);
    }
  };

  return { form, handleSubmit, isLoading, isError }
};

import { useForm, UseFormReturn } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setMnemonic } from "@wallet/store/wallet.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImportWalletData, importWalletSchema } from "@wallet/schemas/wallet.schema";
import { Keyboard } from "react-native";

export interface UseImportWalletFormReturnType {
  form: UseFormReturn<ImportWalletData>;
  handleImportWallet: (importWalletData: ImportWalletData) => void;
}

export const useImportWalletForm = ({ onNavigate }: {
  onNavigate: () => void;
}): UseImportWalletFormReturnType => {
  const form = useForm<ImportWalletData>({
    resolver: zodResolver(importWalletSchema),
  });

  const dispatch = useDispatch();

  const handleImportWallet = ({ mnemonic }: ImportWalletData) => {
    Keyboard.dismiss();
    dispatch(setMnemonic(mnemonic));
    onNavigate();
  };

  return { form, handleImportWallet };
};

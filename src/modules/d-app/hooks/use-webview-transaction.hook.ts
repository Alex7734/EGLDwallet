import { TransactionFromWebviewType } from "@d-app/types/interfaces/transaction.interface";
import { Transaction } from "@multiversx/sdk-core/out";
import { signTransaction } from "@helpers/transaction.utils";
import { useSelector } from "react-redux";
import { userWalletSelector } from "@wallet/store/selectors/wallet.selector";
import { RefObject, useRef, useState } from "react";
import { WebView } from "react-native-webview";
import { WebViewProviderResponseEnums } from "@multiversx/sdk-dapp/types";
import { stringToIAddress } from "@wallet/helpers/wallet.utils";
import { TransactionPayload } from "@d-app/types/classes/transaction-payload.class";

export type TransactionFromWebviewReturnType = {
  handleTransactionFromWebview: (transaction: TransactionFromWebviewType) => void;
  modalDetails: string | null;
  onCloseModal: () => void;
  onAcceptTransaction: () => void;
  refWebview: RefObject<WebView>;
}

const formatModalText = (transaction: TransactionFromWebviewType) => {
  return `  Transaction received from webview: \n
  Send ${transaction.value} XeGLD to: ${transaction.receiver}
  `;
}

export const useWebviewTransaction = (): TransactionFromWebviewReturnType => {
  const refWebview = useRef<WebView>(null);
  const userWallet = useSelector(userWalletSelector);
  const [modalDetails, setModalDetails] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const handleTransactionFromWebview = async (transaction: TransactionFromWebviewType) => {
    setModalDetails(formatModalText(transaction));
    const transactionToSign = new Transaction({
      chainID: transaction.chainID,
      data: new TransactionPayload(transaction.data),
      gasLimit: transaction.gasLimit,
      gasPrice: transaction.gasPrice,
      nonce: transaction.nonce,
      sender: stringToIAddress(transaction.sender),
      receiver: stringToIAddress(transaction.receiver),
      value: transaction.value,
      version: transaction.version,
    })
    await signTransaction(transactionToSign, userWallet);
    setTransaction(transactionToSign)
  }

  const handleCloseModal = () => {
    setModalDetails(null);
    console.log('closed')
  }

  const handleAcceptTransaction = () => {
    setModalDetails(null);
    refWebview.current?.postMessage(JSON.stringify({
      type: WebViewProviderResponseEnums.signTransactionsResponse,
      message: [transaction]
    }))
  }

  return { refWebview, handleTransactionFromWebview, modalDetails, onCloseModal: handleCloseModal, onAcceptTransaction: handleAcceptTransaction };
}

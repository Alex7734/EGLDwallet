import { ApiNetworkProvider, ProxyNetworkProvider } from "@multiversx/sdk-network-providers/out";
import { BASE_API_URL, BASE_GATEWAY_URL, TEST_PASSWORD } from "@constants/api.constants";
import { TransactionPayloadType } from "@wallet/types/interfaces/transaction.interface";
import { stringToIAddress } from "@wallet/helpers/wallet.utils";
import { UserSigner } from "@multiversx/sdk-wallet/out";
import { TokenTransfer, Transaction } from "@multiversx/sdk-core/out";
import { signTransaction } from "@helpers/transaction.utils";

export const apiNetworkProvider = new ApiNetworkProvider(BASE_API_URL);
export const proxyNetworkProvider = new ProxyNetworkProvider(BASE_GATEWAY_URL);

export const makeTransaction = async ({ transactionData, accountData, userWallet }: TransactionPayloadType) => {
  const networkConfig = await apiNetworkProvider.getNetworkConfig();
  const senderAddress = stringToIAddress(accountData.address.toString());

  const transaction = new Transaction({
    chainID: networkConfig.ChainID,
    gasLimit: networkConfig.MinGasLimit,
    nonce: accountData.nonce,
    sender: senderAddress,
    receiver: transactionData.address,
    value: TokenTransfer.egldFromAmount(transactionData.amount),
  });

  await signTransaction(transaction, userWallet);
  const transactionHash = await proxyNetworkProvider.sendTransaction(transaction);
  return { data: transactionHash };
}

export const getAccountDetails =  (walletAddress: string) => `/accounts/${walletAddress}`
export const getTransactions = (walletAddress: string) => `/accounts/${walletAddress}/transactions`;


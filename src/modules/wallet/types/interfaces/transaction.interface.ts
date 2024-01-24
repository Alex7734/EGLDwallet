import { SendTransactionData } from "@wallet/schemas/wallet.schema";
import { Account } from "@multiversx/sdk-core/out";
import { UserWallet } from "@multiversx/sdk-wallet/out";

export interface TransactionPayloadType {
  transactionData: SendTransactionData,
  accountData: Account,
  userWallet: UserWallet,
}

export interface TransactionInfoType {
  txHash: string
  gasLimit: number
  gasPrice: number
  gasUsed: number
  miniBlockHash: string
  nonce: number
  receiver: string
  receiverUsername: string
  receiverAssets: ReceiverAssets
  receiverShard: number
  round: number
  sender: string
  senderUsername: string
  senderAssets: SenderAssets
  senderShard: number
  signature: string
  status: string
  value: string
  fee: string
  timestamp: number
  data: string
  function: string
  action: Action
  scamInfo: ScamInfo
  type: string
  originalTxHash: string
  pendingResults: boolean
  guardianAddress: string
  guardianSignature: string
  isRelayed: string
}

export interface ReceiverAssets {}

export interface SenderAssets {}

export interface Action {
  category: string
  name: string
  description: string
  arguments: Arguments
}

export interface Arguments {}

export interface ScamInfo {
  type: string
  info: string
}

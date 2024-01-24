import { I16Value, IChainID, INonce } from "@multiversx/sdk-core/out";

export interface TransactionFromWebviewType {
  chainID:  IChainID;
  data:     string;
  gasLimit: number;
  gasPrice: number;
  nonce:    INonce;
  receiver: string;
  sender:   string;
  value:    I16Value;
  version:  number;
}

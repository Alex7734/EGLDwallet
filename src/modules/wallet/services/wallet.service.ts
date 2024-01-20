import { BASE_URL } from "@constants/api.constants";
import { Account, Transaction } from "@multiversx/sdk-core/out";
import { TransactionInfo } from "@wallet/types/interfaces/transaction.interface";

export const fetchAccountDataService = async (walletAddress: string): Promise<Account> => {
  const response = await fetch(`${BASE_URL}/accounts/${walletAddress}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch account data');
  }

  return await response.json();
};

export const fetchAccountTransactionsService = async (walletAddress: string): Promise<TransactionInfo[]> => {
  const response = await fetch(`${BASE_URL}/accounts/${walletAddress}/transactions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch account transactions');
  }

  return await response.json();
}

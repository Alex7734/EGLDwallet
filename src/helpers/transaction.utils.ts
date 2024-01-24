import { UserSigner, UserWallet } from "@multiversx/sdk-wallet/out";
import { TEST_PASSWORD } from "@constants/api.constants";
import { Transaction } from "@multiversx/sdk-core/out";

export const signTransaction = async (transaction: Transaction, userWallet: UserWallet) => {
  const signer = UserSigner.fromWallet(userWallet.toJSON(), TEST_PASSWORD);

  const serializedTransaction = transaction.serializeForSigning();
  const transactionSignature = await signer.sign(serializedTransaction);

  transaction.applySignature(transactionSignature);
}

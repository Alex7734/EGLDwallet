import * as z from 'zod';
import { isValidMnemonicFormat, stringToIAddress } from "@wallet/helpers/wallet.utils";

export const sendTransactionSchema = z.object({
  address: z.string().min(62, 'Address must be 62 characters').transform((value) => stringToIAddress(value)),
  amount: z.string().min(1)
    .transform((value) => value.replace(/,/g, '.'))
    .refine((value) => {
      const parsedValue = parseFloat(value);
      return !isNaN(parsedValue) && parsedValue > 0;
    }, { message: 'Amount must be a number greater than 0' }),
});

export type SendTransactionData = z.infer<typeof sendTransactionSchema>;

export const importWalletSchema = z.object({
  mnemonic: z.string()
    .min(1, 'You must enter the mnemonic words')
    .refine(isValidMnemonicFormat, {
      message: 'Invalid mnemonic format',
    }),
});

export type ImportWalletData = z.infer<typeof importWalletSchema>;

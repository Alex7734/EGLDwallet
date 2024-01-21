import * as z from 'zod';
import { stringToIAddress } from "@wallet/helpers/wallet.utils";

// TODO: Parse the amount such that , is allowed as well as . for decimal places.

export const sendTransactionSchema = z.object({
  address: z.string().min(62, 'Address must be 62 characters').transform((value) => stringToIAddress(value)),
  amount: z.string().min(1).refine((value) => parseFloat(value) > 0, { message: 'Amount must be greater than 0', }),
});

export type SendTransactionData = z.infer<typeof sendTransactionSchema>;

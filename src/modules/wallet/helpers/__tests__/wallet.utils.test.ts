import { formatBalance, getBlockchainKeys } from "@wallet/helpers/wallet.utils";

describe('getBlockchainKeys', () => {
  it('returns valid keys for a given mnemonic', () => {
    const mnemonic = 'matrix public noble feed canoe quiz craft suspect desert embrace update leaf derive boy wheat input confirm firm hotel tumble mountain law vacuum penalty';
    const keys = getBlockchainKeys(mnemonic);
    expect(keys).toHaveProperty('secretKey');
    expect(keys).toHaveProperty('publicKey');
  });
});

describe('formatBalance', () => {
  it('should correctly format the balance', () => {
    const balance = 1000000000000000000n;
    const formatted = formatBalance(balance);

    expect(formatted).toBe('1.00');
  });

  it('should return undefined for an undefined balance', () => {
    const formatted = formatBalance(undefined);

    expect(formatted).toBeUndefined();
  });
});

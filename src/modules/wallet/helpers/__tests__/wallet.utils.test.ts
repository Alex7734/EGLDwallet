import { getBlockchainKeys } from "@wallet/helpers/wallet.utils";

describe('getBlockchainKeys', () => {
  it('returns valid keys for a given mnemonic', () => {
    const mnemonic = 'matrix public noble feed canoe quiz craft suspect desert embrace update leaf derive boy wheat input confirm firm hotel tumble mountain law vacuum penalty';
    const keys = getBlockchainKeys(mnemonic);
    expect(keys.secretKey.hex().length == 64).toBeTruthy();
    expect(keys.publicKey.hex().length == 64).toBeTruthy();
  });

});

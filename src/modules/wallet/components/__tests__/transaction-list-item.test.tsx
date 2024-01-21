import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { TransactionListItem } from "@wallet/components/transaction-list-item";

describe('TransactionListItem', () => {
  it('displays transaction details', () => {
    // here there are a lot of properties, so I will use a mock with any type
    const mockTransaction = {
      miniBlockHash: '0x1234',
    } as any;
    render(<TransactionListItem transaction={mockTransaction} index={1} />);
    expect(screen.getByText(`0x1234`)).toBeTruthy();
  });
});

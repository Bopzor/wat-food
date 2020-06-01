import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ListPage from '../ListPage';

describe('ListPage', () => {
  it('should add input item on submit', async () => {
    const { getByText, getByPlaceholderText, getByTestId, getByLabelText } = render(<ListPage />);

    const addInput = getByPlaceholderText('Add...') as HTMLInputElement;

    await userEvent.type(addInput, 'item 1');
    fireEvent.submit(getByTestId('add item'));

    const checkbox = getByLabelText('item state 0') as HTMLInputElement;

    expect(addInput.value).toEqual('');
    expect(getByText('item 1'));
    expect(checkbox.checked).toBe(false);
  });
});

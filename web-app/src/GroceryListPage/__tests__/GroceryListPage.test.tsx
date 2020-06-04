import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import GroceryListPage from '../GroceryListPage';

describe('GroceryListPage', () => {
  it('should reset input after submit', async () => {
    const { getByPlaceholderText, getByTestId } = render(<GroceryListPage />);

    const addInput = getByPlaceholderText('Add...') as HTMLInputElement;

    await userEvent.type(addInput, 'item 1');
    fireEvent.submit(getByTestId('add item'));

    expect(addInput.value).toEqual('');
  });

  it('should add item on submit', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<GroceryListPage />);

    const addInput = getByPlaceholderText('Add...') as HTMLInputElement;

    await userEvent.type(addInput, 'item 1');
    fireEvent.submit(getByTestId('add item'));

    expect(getByText('item 1'));
  });

  it('should add unchecked item by default', async () => {
    const { getByPlaceholderText, getByTestId, getByLabelText } = render(<GroceryListPage />);

    const addInput = getByPlaceholderText('Add...') as HTMLInputElement;

    await userEvent.type(addInput, 'item 1');
    fireEvent.submit(getByTestId('add item'));

    const checkbox = getByLabelText('item state item 1') as HTMLInputElement;

    expect(checkbox.checked).toBe(false);
  });
});

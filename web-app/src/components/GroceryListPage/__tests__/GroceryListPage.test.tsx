/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import GroceryListPage from '../GroceryListPage';

describe('GroceryListPage', () => {
  beforeEach(() => {
    localStorage.clear();

    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
  });

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

    const value = JSON.stringify([{ name: 'item 1', checked: false }]);

    expect(localStorage.setItem).toHaveBeenCalledWith('wat-food', value);

    expect(getByText('item 1')).toBeVisible();
  });

  it('should add unchecked item by default', async () => {
    const { getByPlaceholderText, getByTestId, getByLabelText } = render(<GroceryListPage />);

    const addInput = getByPlaceholderText('Add...') as HTMLInputElement;

    await userEvent.type(addInput, 'item 1');
    fireEvent.submit(getByTestId('add item'));

    const checkbox = getByLabelText('item state item 1') as HTMLInputElement;

    expect(checkbox.checked).toBe(false);
  });

  it('should display existing data from localStorage', () => {
    localStorage.getItem.mockReturnValue(
      JSON.stringify([
        { name: 'item 1', checked: false },
        { name: 'item 2', checked: true },
      ]),
    );

    const { getByLabelText, getByText } = render(<GroceryListPage />);

    const checkbox = getByLabelText('item state item 2') as HTMLInputElement;

    expect(getByText('item 1')).toBeVisible();
    expect(checkbox.checked).toBe(true);
  });
});

/* eslint-disable @typescript-eslint/unbound-method */

import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { AddGroceryItemProps } from '../../AddGroceryItem/AddGroceryItem';
import GroceryListPage from '../GroceryListPage';
import { useAddGroceryItem } from '../use-add-grocery-item';

jest.mock('../../AddGroceryItem/AddGroceryItem.tsx', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, react/display-name
  default: ({ addItem }: AddGroceryItemProps) => (
    <button onClick={(): void => addItem({ name: 'pomme', checked: false })}>Submit</button>
  ),
}));

jest.mock('../use-add-grocery-item.ts');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mockUseAddGroceryItem = (returnValue = {}) => {
  useAddGroceryItem.mockReturnValue({
    item: null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    add: (name: string): void => {},
    ...returnValue,
  });
};

describe('GroceryListPage', () => {
  beforeEach(() => {
    localStorage.clear();

    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
  });

  it('should store item on submit', () => {
    mockUseAddGroceryItem();
    const { getByText } = render(<GroceryListPage />);

    const submitButton = getByText('Submit');

    act(() => {
      submitButton.click();
    });

    const value = JSON.stringify([{ name: 'pomme', checked: false }]);

    expect(localStorage.setItem).toHaveBeenCalledWith('wat-food', value);
  });

  it('should display added item in list ', () => {
    mockUseAddGroceryItem({ item: { name: 'pomme', checked: false, id: 1 } });
    const { getByText } = render(<GroceryListPage />);

    expect(getByText('pomme')).toBeVisible();
  });

  it('should display existing data from localStorage', () => {
    mockUseAddGroceryItem();
    localStorage.getItem.mockReturnValue(
      JSON.stringify([
        { name: 'pomme', checked: false, id: 1 },
        { name: 'banane', checked: true, id: 2 },
      ]),
    );

    const { getByLabelText, getByText } = render(<GroceryListPage />);

    const checkbox = getByLabelText('item state banane') as HTMLInputElement;

    expect(getByText('pomme')).toBeVisible();
    expect(checkbox.checked).toBe(true);
  });

  it('should send item to api on submit', async () => {
    const mockAdd = jest.fn();
    mockUseAddGroceryItem({ add: mockAdd });
    const { getByText } = render(<GroceryListPage />);

    // eslint-disable-next-line @typescript-eslint/await-thenable
    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await fireEvent.click(getByText('Submit'));
    });

    expect(mockAdd).toHaveBeenCalledWith('pomme');
  });

  it('should checked item on checkbox click', () => {
    mockUseAddGroceryItem();
    localStorage.getItem.mockReturnValue(JSON.stringify([{ name: 'pomme', checked: false, id: 1 }]));

    const { getByLabelText } = render(<GroceryListPage />);

    const checkbox = getByLabelText('item state pomme') as HTMLInputElement;

    act(() => {
      userEvent.click(checkbox);
    });

    expect(checkbox.checked).toBe(true);
  });

  it('should checked item on checkbox click', () => {
    mockUseAddGroceryItem();
    localStorage.getItem.mockReturnValue(JSON.stringify([{ name: 'pomme', checked: true, id: 1 }]));

    const { getByLabelText } = render(<GroceryListPage />);

    const checkbox = getByLabelText('item state pomme') as HTMLInputElement;

    act(() => {
      userEvent.click(checkbox);
    });

    expect(checkbox.checked).toBe(false);
  });

  it('should update item in localStorage on toggle checked', () => {
    mockUseAddGroceryItem();
    localStorage.getItem.mockReturnValue(JSON.stringify([{ name: 'pomme', checked: true, id: 1 }]));

    const { getByLabelText } = render(<GroceryListPage />);

    const checkbox = getByLabelText('item state pomme') as HTMLInputElement;

    act(() => {
      userEvent.click(checkbox);
    });

    const value = JSON.stringify([{ name: 'pomme', checked: true, id: 1 }]);
    expect(localStorage.setItem).toHaveBeenCalledWith('wat-food', value);
  });
});

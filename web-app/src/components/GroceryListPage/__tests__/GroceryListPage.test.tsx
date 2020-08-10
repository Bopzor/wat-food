/* eslint-disable @typescript-eslint/unbound-method */

import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { AddGroceryItemProps } from '../../AddGroceryItem/AddGroceryItem';
import { GroceryListProps } from '../../GroceryList/GroceryList';
import GroceryListPage from '../GroceryListPage';
import { useAddGroceryItem } from '../use-add-grocery-item';

jest.mock('../../AddGroceryItem/AddGroceryItem.tsx', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, react/display-name
  default: ({ addItem }: AddGroceryItemProps) => (
    <button onClick={(): void => addItem({ name: 'pomme', checked: false })}>Submit</button>
  ),
}));

jest.mock('../../GroceryList/GroceryList.tsx', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, react/display-name
  default: ({ items, checkItem, deleteItem }: GroceryListProps) => (
    <>
      {items.map((i) => (
        <div key={i.name}>
          <div>{i.name}</div>
          <input
            type="checkbox"
            onChange={(): void => {
              return;
            }}
            checked={i.checked}
            aria-label={`item state ${i.name}`}
          />
        </div>
      ))}
      <button onClick={(): void => checkItem({ name: 'pomme', checked: false, id: 1 })}>Checked</button>
      <button onClick={(): void => deleteItem({ name: 'pomme', checked: true, id: 1 })}>Delete</button>
    </>
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
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should store item on submit', () => {
    mockUseAddGroceryItem();
    const { getByText } = render(<GroceryListPage />);

    fireEvent.click(getByText('Submit'));

    const value = JSON.stringify([{ name: 'pomme', checked: false }]);

    expect(localStorage.setItem).toHaveBeenCalledWith('wat-food', value);
  });

  it('should display added item in list ', () => {
    mockUseAddGroceryItem();
    const { getByText } = render(<GroceryListPage />);

    fireEvent.click(getByText('Submit'));

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

  it('should send item to api on submit', () => {
    const mockAdd = jest.fn();
    mockUseAddGroceryItem({ add: mockAdd });
    const { getByText } = render(<GroceryListPage />);

    fireEvent.click(getByText('Submit'));

    expect(mockAdd).toHaveBeenCalledWith('pomme');
  });

  it('should update localStorage on toggle checkbox', () => {
    mockUseAddGroceryItem();
    localStorage.getItem.mockReturnValue(JSON.stringify([{ name: 'pomme', checked: false, id: 1 }]));

    const { getByText } = render(<GroceryListPage />);

    fireEvent.click(getByText('Checked'));

    const value = JSON.stringify([{ name: 'pomme', checked: true, id: 1 }]);
    expect(localStorage.setItem).toHaveBeenLastCalledWith('wat-food', value);
  });

  it('should remove item from the list', () => {
    mockUseAddGroceryItem({ item: { name: 'pomme', checked: false, id: 1 } });

    const { getByText } = render(<GroceryListPage />);

    fireEvent.click(getByText('Delete'));

    expect(localStorage.setItem).toHaveBeenCalledWith('wat-food', JSON.stringify([]));
  });
});

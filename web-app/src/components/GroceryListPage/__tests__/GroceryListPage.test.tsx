/* eslint-disable @typescript-eslint/unbound-method */

import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router';

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
  let history: MemoryHistory | undefined;
  const mockUpdateLists = jest.fn();

  beforeEach(() => {
    history = createMemoryHistory();
    history.push('/list', { index: 0, list: [] });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should store item on submit', () => {
    mockUseAddGroceryItem();
    const { getByText } = render(
      <Router history={history}>
        <GroceryListPage updateLists={mockUpdateLists} />
      </Router>,
    );

    fireEvent.click(getByText('Submit'));

    const value = [{ name: 'pomme', checked: false }];

    expect(mockUpdateLists).toHaveBeenLastCalledWith(value, 0);
  });

  it('should display added item in list ', () => {
    mockUseAddGroceryItem();
    const { getByText } = render(
      <Router history={history}>
        <GroceryListPage updateLists={mockUpdateLists} />
      </Router>,
    );

    fireEvent.click(getByText('Submit'));

    expect(getByText('pomme')).toBeVisible();
  });

  it('should display list data', () => {
    mockUseAddGroceryItem();
    history.push('/list', {
      index: 0,
      list: {
        name: 'list',
        items: [
          { name: 'pomme', checked: false, id: 1 },
          { name: 'banane', checked: true, id: 2 },
        ],
      },
    });

    const { getByLabelText, getByText } = render(
      <Router history={history}>
        <GroceryListPage updateLists={mockUpdateLists} />
      </Router>,
    );

    const checkbox = getByLabelText('item state banane') as HTMLInputElement;

    expect(getByText('pomme')).toBeVisible();
    expect(checkbox.checked).toBe(true);
  });

  it('should send item to api on submit', () => {
    const mockAdd = jest.fn();
    mockUseAddGroceryItem({ add: mockAdd });
    const { getByText } = render(
      <Router history={history}>
        <GroceryListPage updateLists={jest.fn} />
      </Router>,
    );

    fireEvent.click(getByText('Submit'));

    expect(mockAdd).toHaveBeenCalledWith('pomme');
  });

  it('should update items on toggle checkbox', () => {
    mockUseAddGroceryItem();
    history.push('/list', {
      index: 0,
      list: {
        name: 'list',
        items: [{ name: 'pomme', checked: false, id: 1 }],
      },
    });

    const { getByText } = render(
      <Router history={history}>
        <GroceryListPage updateLists={mockUpdateLists} />
      </Router>,
    );

    fireEvent.click(getByText('Checked'));

    const value = [{ name: 'pomme', checked: true, id: 1 }];
    expect(mockUpdateLists).toHaveBeenLastCalledWith(value, 0);
  });

  it('should remove item from the list', () => {
    mockUseAddGroceryItem({ item: { name: 'pomme', checked: false, id: 1 } });

    const { getByText } = render(
      <Router history={history}>
        <GroceryListPage updateLists={mockUpdateLists} />
      </Router>,
    );

    fireEvent.click(getByText('Delete'));

    expect(mockUpdateLists).toHaveBeenCalledWith([], 0);
  });
});

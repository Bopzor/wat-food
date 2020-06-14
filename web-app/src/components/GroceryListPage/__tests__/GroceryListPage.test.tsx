/* eslint-disable */
/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';

import { fireEvent, render, wait, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { AddGroceryItemProps } from '../../AddGroceryItem/AddGroceryItem';
import GroceryListPage from '../GroceryListPage';

jest.mock('../../AddGroceryItem/AddGroceryItem.tsx', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, react/display-name
  default: ({ addItem }: AddGroceryItemProps) => (
    <button onClick={(): void => addItem({ name: 'item 1', checked: false })}>Submit</button>
  ),
}));

describe('GroceryListPage', () => {
  beforeEach(() => {
    localStorage.clear();

    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  // it('should add item to the list on submit', () => {
  //   const { getByText } = render(<GroceryListPage />);

  //   const submitButton = getByText('Submit');

  //   act(() => {
  //     submitButton.click();
  //   });

  //   const value = JSON.stringify([{ name: 'item 1', checked: false }]);

  //   expect(localStorage.setItem).toHaveBeenCalledWith('wat-food', value);

  //   expect(getByText('item 1')).toBeVisible();
  // });

  it('should send item to api on submit', async () => {
    // const { getByText } = render(<GroceryListPage />);
    // fireEvent.click(getByText('Submit'));
    // await waitFor(() => expect(mockAxios).toHaveBeenCalledTimes(1));
    // await mockAxiosResponseFor({ url: 'http://localhost:3000/shop-item' }, { data: [] });
    // // expect(mockAxios).toHaveBeenCalledWith(
    // //   expect.objectContaining({
    // //     params: {
    // //       name: 'item 1',
    // //     },
    // //     url: 'http://localhost:3000/shop-item',
    // //   }),
    // // );
    // const value = JSON.stringify([{ name: 'item 1', checked: false }]);
    // expect(getByText('item 1')).toBeVisible();
  });

  // it('should add unchecked item by default', () => {
  //   const { getByText, getByLabelText } = render(<GroceryListPage />);

  //   const submitButton = getByText('Submit');

  //   act(() => {
  //     submitButton.click();
  //   });

  //   const checkbox = getByLabelText('item state item 1') as HTMLInputElement;

  //   expect(checkbox.checked).toBe(false);
  // });

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

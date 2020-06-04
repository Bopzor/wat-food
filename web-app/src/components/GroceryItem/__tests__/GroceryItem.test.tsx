/* eslint-disable @typescript-eslint/no-empty-function */

import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import GroceryItem from '../GroceryItem';

describe('GroceryItem', () => {
  it('should check item', () => {
    const mockCheckItem = jest.fn();

    const { getByText } = render(
      <GroceryItem item={{ name: 'item 1', checked: false }} checkItem={mockCheckItem} deleteItem={(): void => {}} />,
    );

    fireEvent.click(getByText('item 1'));

    expect(mockCheckItem).toHaveBeenCalledWith({ name: 'item 1', checked: false });
  });

  it('should uncheck item', () => {
    const mockCheckItem = jest.fn();

    const { getByText } = render(
      <GroceryItem item={{ name: 'item 1', checked: true }} checkItem={mockCheckItem} deleteItem={(): void => {}} />,
    );

    fireEvent.click(getByText('item 1'));

    expect(mockCheckItem).toHaveBeenCalledWith({ name: 'item 1', checked: true });
  });
});

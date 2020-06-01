import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import ItemsList from '../ItemsList';

describe('ItemsList', () => {
  it('should check item', () => {
    const mockCheckItem = jest.fn();

    const { getByLabelText } = render(
      <ItemsList items={[{ name: 'item 1', checked: false }]} checkItem={mockCheckItem} />,
    );

    const checkbox = getByLabelText('item state 0') as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(mockCheckItem).toHaveBeenCalledWith({ name: 'item 1', checked: false });
  });

  it('should uncheck item', () => {
    const mockCheckItem = jest.fn();

    const { getByLabelText } = render(
      <ItemsList items={[{ name: 'item 1', checked: true }]} checkItem={mockCheckItem} />,
    );

    const checkbox = getByLabelText('item state 0') as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(mockCheckItem).toHaveBeenCalledWith({ name: 'item 1', checked: true });
  });
});

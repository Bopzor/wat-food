/* eslint-disable @typescript-eslint/no-empty-function */

import React from 'react';

import { render } from '@testing-library/react';

import GroceryList from '../../GroceryList/GroceryList';

describe('GroceryList', () => {
  it('should display item name', () => {
    const { queryByText } = render(
      <GroceryList
        items={[{ name: 'item 1', checked: false }]}
        checkItem={(): void => {}}
        deleteItem={(): void => {}}
      />,
    );

    expect(queryByText('item 1'));
  });

  it('should display unchecked item', () => {
    const { getByLabelText } = render(
      <GroceryList
        items={[{ name: 'item 1', checked: false }]}
        checkItem={(): void => {}}
        deleteItem={(): void => {}}
      />,
    );

    const checkbox = getByLabelText('item state item 1') as HTMLInputElement;

    expect(checkbox.checked).toEqual(false);
  });

  it('should display checked item', () => {
    const { getByLabelText } = render(
      <GroceryList
        items={[{ name: 'item 1', checked: true }]}
        checkItem={(): void => {}}
        deleteItem={(): void => {}}
      />,
    );

    const checkbox = getByLabelText('item state item 1') as HTMLInputElement;

    expect(checkbox.checked).toEqual(true);
  });
});

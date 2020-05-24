import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import ListPage from '../ListPage';

describe('ListPage', () => {

  it('should add input item on submit', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<ListPage />)

    await userEvent.type(getByPlaceholderText('Add...'), 'item 1');
    fireEvent.submit(getByTestId('add item'));

    expect(getByPlaceholderText('Add...').value).toEqual('');

    expect(getByText('item 1'));
  });

});

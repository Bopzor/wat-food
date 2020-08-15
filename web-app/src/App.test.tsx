/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory, MemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router';

import App from './App';
import { GroceyListPageProps } from './components/GroceryListPage/GroceryListPage';
import { ListsPageProps } from './components/ListsPage/ListsPage';

jest.mock('./components/GroceryListPage/GroceryListPage.tsx', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, react/display-name
  default: ({ updateLists }: GroceyListPageProps) => (
    <button onClick={(): void => updateLists([{ name: 'pomme', checked: false }], 0)}>Update</button>
  ),
}));

jest.mock('./components/ListsPage/ListsPage.tsx', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, react/display-name
  default: ({ deleteList }: ListsPageProps) => <button onClick={(): void => deleteList(0)}>Delete</button>,
}));

describe('App', () => {
  let history: MemoryHistory;

  beforeEach(() => {
    jest.resetAllMocks();
    history = createMemoryHistory();
    history.push('/');
  });

  it('should render App', () => {
    const { getByTestId } = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    expect(getByTestId('app')).toBeTruthy();
  });

  it('should get data from localStorage', () => {
    render(
      <Router history={history}>
        <App />
      </Router>,
    );

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(localStorage.getItem).toHaveBeenCalledWith('wat-food');
  });

  it('should create new list', async () => {
    jest.spyOn(history, 'push');
    const { getByTestId, getByLabelText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    act(() => {
      userEvent.click(getByLabelText('new-list'));
    });

    await act(async () => {
      await userEvent.type(getByLabelText('List name'), 'New list');
    });

    fireEvent.submit(getByTestId('list-form'));

    expect(localStorage.setItem).toHaveBeenCalledWith('wat-food', JSON.stringify([{ name: 'New list', items: [] }]));
    expect(history.push).toHaveBeenCalledWith(
      '/New list',
      expect.objectContaining({ list: { name: 'New list', items: [] }, index: 0 }),
    );
  });

  it('should update a list', () => {
    history.push('/list');
    const getItem: jest.Mock = localStorage.getItem;
    getItem.mockImplementationOnce(() => JSON.stringify([{ name: 'list', items: [] }]));

    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    fireEvent.click(getByText('Update'));

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'wat-food',
      JSON.stringify([{ name: 'list', items: [{ name: 'pomme', checked: false }] }]),
    );
  });

  it('should delete list', () => {
    const getItem: jest.Mock = localStorage.getItem;
    getItem.mockImplementationOnce(() => JSON.stringify([{ name: 'list', items: [] }]));

    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    fireEvent.click(getByText('Delete'));

    expect(localStorage.setItem).toHaveBeenCalledWith('wat-food', JSON.stringify([]));
  });
});

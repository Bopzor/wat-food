/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router';

import Header from '../Header';

describe('Header', () => {
  let history: MemoryHistory;

  beforeEach(() => {
    jest.resetAllMocks();
    history = createMemoryHistory();
    history.push('/');
  });

  it('should render header', () => {
    const { getByTestId } = render(
      <Router history={history}>
        <Header openForm={jest.fn} />
      </Router>,
    );

    expect(getByTestId('header')).toBeVisible();
  });

  it('should render only page title on /', () => {
    const { queryByLabelText, getByText } = render(
      <Router history={history}>
        <Header openForm={jest.fn} />
      </Router>,
    );

    expect(queryByLabelText('return')).toBe(null);
    expect(getByText('LISTS')).toBeVisible();
  });

  it('should render return icon on /:name', () => {
    history.push('/name');
    const { getByLabelText, getByText } = render(
      <Router history={history}>
        <Header openForm={jest.fn} />
      </Router>,
    );

    expect(getByLabelText('return')).toBeVisible();
    expect(getByText('NAME')).toBeVisible();
  });

  it('should go to / on return icon click', () => {
    history.push('/name');
    jest.spyOn(history, 'push');
    const { getByLabelText } = render(
      <Router history={history}>
        <Header openForm={jest.fn} />
      </Router>,
    );

    userEvent.click(getByLabelText('return'));
    expect(history.push).toHaveBeenCalledWith('/');
  });

  it('should call openForm on add list icon', () => {
    const mockOpenForm = jest.fn();

    const { getByLabelText } = render(
      <Router history={history}>
        <Header openForm={mockOpenForm} />
      </Router>,
    );

    userEvent.click(getByLabelText('new-list'));
    expect(mockOpenForm).toHaveBeenCalled();
  });
});

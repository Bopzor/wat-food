import React from 'react';

import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

import App from './App';

describe('App', () => {
  it('should render App', () => {
    const { getByTestId } = render(
      <Router history={createMemoryHistory()}>
        <App />
      </Router>,
    );

    expect(getByTestId('app')).toBeTruthy();
  });
});

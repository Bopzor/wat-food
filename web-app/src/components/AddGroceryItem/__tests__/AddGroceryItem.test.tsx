import React from 'react';

import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AddGroceryItem from '../AddGroceryItem';
import { useSearchGroceryItem } from '../use-search-grocery-item';

jest.mock('src/hooks/use-debounce.ts', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useDebounce: <T extends unknown>(value: T, delay: number): T => value,
}));

jest.mock('../use-search-grocery-item.ts');

/* eslint-disable */
const mockUseSearchGroceryItem = (returnValue = {}) => {
  useSearchGroceryItem.mockReturnValue({
    options: [],
    setOptions: (o: string[]): void => {},
    loading: false,
    search: (name: string): void => {},
    ...returnValue,
  });
  /* eslint-enable */
};

describe('AddGroceryItem', () => {
  const mockAddItem = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should reset input after submit', async () => {
    mockUseSearchGroceryItem();
    const { getByPlaceholderText, getByTestId, getByText } = render(<AddGroceryItem addItem={mockAddItem} />);
    const form = getByTestId('add item') as HTMLFormElement;
    const input = getByPlaceholderText('Add...') as HTMLInputElement;

    await userEvent.type(input, 'pomme');

    userEvent.click(getByText('pomme'));

    form.submit();

    expect(input.value).toBe('');
  });

  it('should add pomme item on submit', async () => {
    mockUseSearchGroceryItem();
    const { getByPlaceholderText, getByTestId, getByText } = render(<AddGroceryItem addItem={mockAddItem} />);
    const form = getByTestId('add item') as HTMLFormElement;
    const input = getByPlaceholderText('Add...') as HTMLInputElement;

    await userEvent.type(input, 'pomme');

    userEvent.click(getByText('pomme'));

    form.submit();

    expect(mockAddItem).toHaveBeenCalledWith({ name: 'pomme', checked: false });
  });

  it('should not add input if suggestion is opened', async () => {
    mockUseSearchGroceryItem();
    const { getByPlaceholderText, getByTestId } = render(<AddGroceryItem addItem={mockAddItem} />);
    const form = getByTestId('add item') as HTMLFormElement;
    const input = getByPlaceholderText('Add...') as HTMLInputElement;

    await userEvent.type(input, 'pomme');

    form.submit();

    expect(mockAddItem).not.toHaveBeenCalled();
  });

  it('should replace input with selected pomme suggestion', async () => {
    mockUseSearchGroceryItem({
      options: [{ name: 'pomme', id: 1 }],
    });

    const { getByPlaceholderText, getByText } = render(<AddGroceryItem addItem={mockAddItem} />);
    const input = getByPlaceholderText('Add...') as HTMLInputElement;

    await userEvent.type(input, 'pom');

    act(() => {
      userEvent.click(getByText('pomme'));
    });

    expect(input.value).toEqual('pomme');
  });
});

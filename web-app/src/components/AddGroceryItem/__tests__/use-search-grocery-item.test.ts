import { act, renderHook } from '@testing-library/react-hooks';
import mockAxios from 'jest-mock-axios';

import { useSearchGroceryItem } from '../use-search-grocery-item';

describe('useSearchGroceryItem', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should call /search with given name as query string', () => {
    const { result } = renderHook(() => useSearchGroceryItem());

    act(() => {
      result.current.search('pomme');
    });

    expect(mockAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        params: { name: 'pomme' },
      }),
    );
  });

  it('should setOption with received data', async () => {
    const { result } = renderHook(() => useSearchGroceryItem());

    act(() => {
      result.current.search('pomme');
    });

    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await mockAxios.mockResponseFor({ url: '/search' }, { data: [{ name: 'pomme', id: 1 }] });
    });

    expect(result.current.options).toMatchObject([{ name: 'pomme', id: 1 }]);
  });
});

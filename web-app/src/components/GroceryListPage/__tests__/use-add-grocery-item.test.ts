import { act, renderHook } from '@testing-library/react-hooks';
import mockAxios from 'jest-mock-axios';

import { useAddGroceryItem } from '../use-add-grocery-item';

describe('useAddGroceryItem', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should call / with given item name to add as query string', () => {
    const { result } = renderHook(() => useAddGroceryItem());

    act(() => {
      result.current.add('pomme');
    });

    expect(mockAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        params: { name: 'pomme' },
      }),
    );
  });

  it('should return new added item', async () => {
    const { result } = renderHook(() => useAddGroceryItem());

    act(() => {
      result.current.add('pomme');
    });

    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await mockAxios.mockResponseFor({ url: '/' }, { data: { name: 'pomme', id: 1, checked: false } });
    });

    expect(result.current.item).toMatchObject({ name: 'pomme', checked: false, id: 1 });
  });

  it('should add unchecked item by default', async () => {
    const { result } = renderHook(() => useAddGroceryItem());

    act(() => {
      result.current.add('pomme');
    });

    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await mockAxios.mockResponseFor({ url: '/' }, { data: { name: 'pomme', id: 1, checked: false } });
    });

    expect(result.current.item.checked).toEqual(false);
  });
});

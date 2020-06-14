import { useEffect, useState } from 'react';

import useAxios from 'axios-hooks';

export const useSearchGroceryItem = () => {
  const [{ data, loading, error }, search] = useAxios({ url: '/search' }, { manual: true });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }

    if (data && !loading) {
      setOptions(data);
    }
  }, [data, loading, error]);

  return {
    options,
    setOptions,
    loading,
    search: (name: string) => search({ params: { name } }),
  };
};

import { useEffect, useState } from 'react';

import useAxios from 'axios-hooks';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAddGroceryItem = () => {
  const [item, setItem] = useState(null);
  const [{ data, loading, error }, add] = useAxios('/', { manual: true });

  useEffect(() => {
    if (error) {
      console.log(error);
    }

    if (data && !loading) {
      setItem({ ...data, checked: false });
    }
  }, [data, loading, error]);

  const handleAddItem = (name: string): void => {
    add({ params: { name } });
    // setItem(null);
  };

  return {
    item,
    setItem,
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    add: (name: string) => handleAddItem(name),
  };
};

import useAxios from 'axios-hooks';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAddGroceryItem = () => {
  const [{ data, error }, add] = useAxios('/', { manual: true });

  if (error) {
    console.log(error);
  }

  return {
    item: data && { ...data, checked: false },
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    add: (name: string) => add({ params: { name } }),
  };
};

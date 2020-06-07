import React, { useState, useEffect } from 'react';

import { TextField, CircularProgress } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import useAxios from 'axios-hooks';
import { AxiosPromise } from 'axios';
import useDebounce from '../hook/use-debounce';

export type GroceryItemType = {
  name: string;
  checked: boolean;
};

type ResultItemType = {
  id: number;
  name: string;
};

const useSearchGroceryItem = () => {
  const [{ data, loading, error }, search] = useAxios('http://localhost:3000/shop-item/search', { manual: true });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }

    if (data && !loading) {
      console.log(data);
      // setOptions(data);
    }
  }, [data, loading, error]);

  return {
    options,
    setOptions,
    loading,
    search: (name: string): AxiosPromise => search({ params: { name } }),
  };
};

type GroceryItem = {
  addItem: (item: GroceryItemType) => void;
};

const GroceryItem: React.FC<GroceryItem> = ({ addItem }) => {
  // const [item, setItem] = useState<GroceryItemType>({ name: '', checked: false });
  const [item, setItem] = useState('');
  const searchQuery = useDebounce(item, 200);
  const [open, setOpen] = useState(false);

  const { options, loading, search, setOptions } = useSearchGroceryItem();

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {
    if (searchQuery) {
      search(searchQuery);
    }
  }, [searchQuery]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    // if (item.name.trim().length === 0) return;

    // addItem(item);
    // setItem({ name: '', checked: false });
  };

  return (
    <form onSubmit={handleSubmit} data-testid="add item">
      <Autocomplete
        open={open}
        onOpen={(): void => setOpen(true)}
        onClose={(): void => setOpen(false)}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option): string => option.name}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            variant="outlined"
            type="text"
            margin="dense"
            placeholder="Add..."
            value={item}
            onChange={(e): void => setItem(e.target.value)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </form>
  );
};

export default GroceryItem;

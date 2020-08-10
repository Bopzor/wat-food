import React, { useEffect, useState } from 'react';

import { CircularProgress, TextField } from '@material-ui/core';
import { Autocomplete, AutocompleteRenderInputParams } from '@material-ui/lab';

import { useDebounce } from '../../hooks/use-debounce';

import { useSearchGroceryItem } from './use-search-grocery-item';

export type GroceryItemType = {
  name: string;
  checked: boolean;
  id?: number;
};

export type AddGroceryItemProps = {
  addItem: (item: GroceryItemType) => void;
};

const AddGroceryItem: React.FC<AddGroceryItemProps> = ({ addItem }) => {
  const [selectedItem, setSelectedItem] = useState({ name: '' });
  const [item, setItem] = useState({ name: '' });
  const searchQuery = useDebounce(item.name, 200);
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

  const buildOptions = (): GroceryItemType[] => {
    const builedOptions = options;

    if (item.name.trim().length > 0) {
      const itemIsInOptions = builedOptions.filter((option) => option.name === searchQuery).length > 0;

      if (!itemIsInOptions) {
        builedOptions.push({ name: searchQuery });
      }
    }

    return builedOptions;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (open) {
      return;
    }

    if (item.name.trim().length === 0) {
      return;
    }

    addItem({ ...selectedItem, checked: false });
    setItem({ name: '' });
    setOptions([]);
  };

  return (
    <form onSubmit={handleSubmit} data-testid="add item">
      <Autocomplete
        freeSolo
        open={open}
        onOpen={(): void => setOpen(true)}
        onClose={(): void => setOpen(false)}
        getOptionSelected={(option, value: { name: string }): boolean => option.name === value.name}
        getOptionLabel={(option: { name: string }): string => option.name}
        options={buildOptions()}
        loading={loading}
        value={selectedItem}
        onChange={(e, value: { name: string }): void => setSelectedItem(value)}
        inputValue={item.name}
        onInputChange={(e, value): void => setItem({ name: value })}
        renderInput={(params: AutocompleteRenderInputParams): React.ReactNode => (
          <TextField
            {...params}
            fullWidth
            variant="outlined"
            type="text"
            margin="dense"
            placeholder="Add..."
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

export default AddGroceryItem;

import React, { useState } from 'react';

import OutlinedInput from '@material-ui/core/OutlinedInput';

export type Item = {
  name: string;
  checked: boolean;
};

type AddItemProps = {
  addItem: (item: Item ) => void;
};

const AddItem: React.FC<AddItemProps> = ({ addItem }: AddItemProps) => {
  const [item, setItem] = useState<Item>({ name: '', checked: false });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (item.name.trim().length === 0)
      return;

    addItem(item);
    setItem({ name: '', checked: false });
  };

  return (
    <form onSubmit={handleSubmit} data-testid="add item">
      <OutlinedInput
        fullWidth
        type="text"
        margin="dense"
        placeholder="Add..."
        value={item.name}
        onChange={(e): void => setItem({ name: e.target.value, checked: false})}
      />
    </form>
  );
};

export default AddItem;

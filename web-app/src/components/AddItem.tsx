import React, { useState } from 'react';

import OutlinedInput from '@material-ui/core/OutlinedInput';

type AddItemProps = {
  addItem: (item: string) => void;
};

const AddItem: React.FC<AddItemProps> = ({ addItem }) => {
  const [item, setItem] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (item.trim().length === 0)
      return;

    addItem(item);
    setItem('');
  };

  return (
    <form onSubmit={handleSubmit} data-testid="add item">
      <OutlinedInput
        fullWidth
        type="text"
        margin="dense"
        placeholder="Add..."
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
    </form>
  );
};

export default AddItem;

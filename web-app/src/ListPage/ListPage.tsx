import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core';

import ItemsList from '../components/ItemsList/ItemsList';
import AddItem, { Item } from '../components/AddItem';

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
}));

const ListPage: React.FC = () => {
  const [items, setItems] = useState([]);

  const classes = useStyles();

  const handleCheckItem = (item: Item): void => {
    const idx = items.indexOf(item);

    if (idx < 0) {
      return;
    }

    // eslint-disable-next-line prettier/prettier
    setItems((i) => [
      ...i.slice(0, idx),
      { ...item, checked: !item.checked },
      ...i.slice(idx + 1),
    ]);
  };

  return (
    <div className={classes.container}>
      <ItemsList items={items} checkItem={handleCheckItem} />
      <AddItem addItem={(item): void => setItems((i) => [...i, item])} />
    </div>
  );
};

export default ListPage;

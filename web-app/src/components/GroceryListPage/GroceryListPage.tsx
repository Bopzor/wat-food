import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core';

import GroceryList from '../GroceryList/GroceryList';
import AddItem, { GroceryItemType } from '../AddGroceryItem';

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
}));

const GroceryListPage: React.FC = () => {
  const savedItems: GroceryItemType[] | null = localStorage.getItem('wat-food')
    ? JSON.parse(localStorage.getItem('wat-food'))
    : null;

  const [items, setItems] = useState(savedItems || []);

  const classes = useStyles();

  useEffect(() => {
    localStorage.setItem('wat-food', JSON.stringify(items));
  }, [items]);

  const handleCheckItem = (item: GroceryItemType): void => {
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

  const handleDeleteItem = (item: GroceryItemType): void => {
    const idx = items.indexOf(item);

    if (idx < 0) {
      return;
    }

    // eslint-disable-next-line prettier/prettier
    setItems((i) => [
      ...i.slice(0, idx),
      ...i.slice(idx + 1),
    ]);
  };

  return (
    <div className={classes.container}>
      <GroceryList items={items} checkItem={handleCheckItem} deleteItem={handleDeleteItem} />
      <AddItem addItem={(item): void => setItems((i) => [...i, item])} />
    </div>
  );
};

export default GroceryListPage;

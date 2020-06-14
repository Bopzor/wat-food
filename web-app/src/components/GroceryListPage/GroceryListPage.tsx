import React, { useState, useEffect } from 'react';

import useAxios from 'axios-hooks';
import { makeStyles } from '@material-ui/core';

import GroceryList from '../GroceryList/GroceryList';
import AddGroceryItem, { GroceryItemType } from '../AddGroceryItem/AddGroceryItem';

const useAddGroceryItem = () => {
  const [{ data, error }, add] = useAxios('http://localhost:3000/shop-item', { manual: true });

  if (error) {
    console.log(error);
  }

  return {
    item: data && { ...data, checked: false },
    add: (name: string): void => {
      add({ params: { name } });
    },
  };
};

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
  const { item, add } = useAddGroceryItem();

  const classes = useStyles();

  useEffect(() => {
    localStorage.setItem('wat-food', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (item) {
      setItems((i) => [...i.slice(i.length - 2), item]);
    }
  }, [item, setItems]);

  const handleAddItem = (item: GroceryItemType): void => {
    setItems((i) => [...i, item]);

    if (!item.id) {
      add(item.name);
    }
  };

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
      <AddGroceryItem addItem={handleAddItem} />
    </div>
  );
};

export default GroceryListPage;

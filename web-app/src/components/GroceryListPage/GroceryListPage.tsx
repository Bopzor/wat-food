import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core';
import { useLocation } from 'react-router';

import AddGroceryItem, { GroceryItemType } from '../AddGroceryItem/AddGroceryItem';
import GroceryList from '../GroceryList/GroceryList';

import { useAddGroceryItem } from './use-add-grocery-item';

type GrocePageProps = {
  updateLists: (items: GroceryItemType, index: number) => void;
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

const GroceryListPage: React.FC<GrocePageProps> = ({ updateLists }) => {
  const { state } = useLocation();
  const { list, index } = state;
  const savedItems = list?.items;

  const [items, setItems] = useState(savedItems || []);
  const { item, setItem, add } = useAddGroceryItem();

  const classes = useStyles();

  useEffect(() => {
    updateLists(items, index);
  }, [items]);

  useEffect(() => {
    if (item) {
      const idx = items.findIndex((i) => i.name === item.name);

      if (idx < 0) {
        return;
      }

      // eslint-disable-next-line prettier/prettier
      setItems((i) => [
        ...i.slice(0, idx),
        item,
        ...i.slice(idx + 1),
      ]);
      setItem(null);
    }
  }, [item, setItems]);

  const handleAddItem = (item: GroceryItemType): void => {
    setItems((i) => [...i, item]);

    if (!item.id) {
      add(item.name);
    }
  };

  const handleCheckItem = (item: GroceryItemType): void => {
    const idx = items.findIndex((i) => i.name === item.name);

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
    const idx = items.findIndex((i) => i.name === item.name);

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

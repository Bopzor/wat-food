import React from 'react';

import { makeStyles } from '@material-ui/core';
import List from '@material-ui/core/List';

import { GroceryItemType } from '../AddGroceryItem/AddGroceryItem';
import GroceryItem from '../GroceryItem/GroceryItem';

const useStyles = makeStyles(() => ({
  list: {
    overflowY: 'auto',
  },
}));

export type GroceryListProps = {
  items: GroceryItemType[];
  checkItem: (item: GroceryItemType) => void;
  deleteItem: (item: GroceryItemType) => void;
};

const GroceryList: React.FC<GroceryListProps> = ({ items, checkItem, deleteItem }) => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      {items.map((item: GroceryItemType, idx) => (
        <React.Fragment key={`${item.name}-${idx}`}>
          <GroceryItem item={item} checkItem={checkItem} deleteItem={deleteItem} />
        </React.Fragment>
      ))}
    </List>
  );
};

export default GroceryList;

import React from 'react';

import { List, makeStyles } from '@material-ui/core';

import { GroceryItemType } from '../AddGroceryItem/AddGroceryItem';
import ListItem from '../ListItem/ListItem';

export type GroceryList = {
  name: string;
  items: GroceryItemType[];
};

type ListsPageProps = {
  lists: GroceryList[];
  deleteList: (index: number) => void;
};

const useStyles = makeStyles(() => ({
  list: {
    overflowY: 'auto',
  },
}));

const ListsPage: React.FC<ListsPageProps> = ({ lists, deleteList }) => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      {lists.map((list: GroceryList, idx) => (
        <React.Fragment key={`${list.name}-${idx}`}>
          <ListItem list={list} index={idx} deleteItem={deleteList} />
        </React.Fragment>
      ))}
    </List>
  );
};

export default ListsPage;

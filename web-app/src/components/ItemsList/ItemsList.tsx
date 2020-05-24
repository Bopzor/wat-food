import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core';

import { Item } from '../AddItem';

const useStyles = makeStyles(() => ({
  list: {
    overflowY: 'auto',
  },
}));

type ItemsListProps = {
  items: Item[];
  checkItem: (item: Item) => void;
};

const ItemsList: React.FC<ItemsListProps> = ({ items, checkItem }: ItemsListProps) => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      { items.map((item: Item, idx) => (
        <React.Fragment key={`${item.name}-${idx}`}>
          <ListItem disabled={item.checked}>

            <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={item.checked}
                  onChange={(): void => checkItem(item)}
                  inputProps={{ 'aria-label': `item state ${idx}` }}
                />
              </ListItemIcon>

            <ListItemText primary={item.name} />

          </ListItem>

          <Divider component="li" />
        </React.Fragment>
      )) }
    </List>
  );
};

export default ItemsList;

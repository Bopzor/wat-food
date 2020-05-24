import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  list: {
    overflowY: 'auto',
  }
}));

type ItemsListProps = {
  items: string[];
};

const ItemsList: React.FC<ItemsListProps> = ({ items }) => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      { items.map((item, idx) => (
        <React.Fragment key={`${item}-${idx}`}>
          <ListItem>
            <ListItemText primary={item} />
          </ListItem>
          <Divider component="li" />
        </React.Fragment>
      )) }
    </List>
  );
};

export default ItemsList;

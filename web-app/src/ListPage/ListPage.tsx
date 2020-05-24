import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core';

import ItemsList from '../components/ItemsList';
import AddItem from '../components/AddItem';

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
  }
}));

const ListPage: React.FC = () => {
  const [items, setItems] = useState([]);

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <ItemsList items={items} />
      <AddItem addItem={(item: string) => setItems((i) => [...i, item])} />
    </div>
  )
};

export default ListPage;

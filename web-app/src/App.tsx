import React from 'react';

import { makeStyles } from '@material-ui/core';

import ListPage from './ListPage/ListPage';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    height: '100%',
  }
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container} data-testid="app">
      <ListPage />
    </div>
  )
};

export default App;

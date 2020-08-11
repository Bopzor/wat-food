import React, { useEffect, useState } from 'react';

import {
  createMuiTheme,
  CssBaseline,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
import { deepOrange, teal } from '@material-ui/core/colors';
import { Route, Switch, useHistory } from 'react-router';

import { GroceryItemType } from './components/AddGroceryItem/AddGroceryItem';
import GroceryListPage from './components/GroceryListPage/GroceryListPage';
import Header from './components/Header/Header';
import ListsPage from './components/ListsPage/ListsPage';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: deepOrange,
  },
});

const useStyles = makeStyles(({ spacing, mixins }) => ({
  container: {
    maxHeight: '100vh',
    height: '100%',
  },
  app: {
    height: `calc(100% - ${mixins.toolbar.minHeight}px)`,
    padding: spacing(1, 2),
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const listsLS = localStorage.getItem('wat-food');
  const [lists, setLists] = useState(listsLS ? JSON.parse(listsLS) : []);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    localStorage.setItem('wat-food', JSON.stringify(lists));
  }, [lists]);

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    setLists([{ name, items: [] }, ...lists]);
    setName('');
    setOpen(false);
    history.push(`/${name}`, { list: { name, items: [] }, index: 0 });
  };

  const handleUpdateList = (items: GroceryItemType, listIndex: number): void => {
    setLists([...lists.slice(0, listIndex), { ...lists[listIndex], items }, ...lists.slice(listIndex + 1)]);
  };

  const handleDeleteList = (listIndex: number): void => {
    setLists([...lists.slice(0, listIndex), ...lists.slice(listIndex + 1)]);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <CssBaseline />
        <Header openForm={(): void => setOpen(true)} />

        <Dialog open={open} onClose={(): void => setOpen(false)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New list</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="List name"
                type="text"
                fullWidth
                value={name}
                onChange={(e): void => setName(e.target.value)}
              />
            </form>
          </DialogContent>
        </Dialog>

        <div className={classes.app} data-testid="app">
          <Switch>
            <Route exact path="/">
              <ListsPage lists={lists} deleteList={handleDeleteList} />
            </Route>

            <Route path="/:name">
              <GroceryListPage updateLists={handleUpdateList} />
            </Route>
          </Switch>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;

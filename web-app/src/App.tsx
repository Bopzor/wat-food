import React from 'react';

import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { teal, deepOrange } from '@material-ui/core/colors';

import ListPage from './ListPage/ListPage';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: deepOrange,
  },
});

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    height: '100%',
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container} data-testid="app">
        <ListPage />
      </div>
    </ThemeProvider>
  );
};

export default App;

import React from 'react';

import { AppBar, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import AddIcon from '@material-ui/icons/PlaylistAdd';
import { useHistory, useLocation } from 'react-router';

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
  },
}));

const Header: React.FC<{ openForm: () => void }> = ({ openForm }) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const history = useHistory();

  return (
    <AppBar position="static" data-testid="header">
      <Toolbar>
        {pathname !== '/' && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="return"
            onClick={(): void => {
              history.push('/');
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography className={classes.title} variant="h6">
          {pathname && (pathname === '/' ? 'LISTS' : pathname.split('/')[1].toUpperCase())}
        </Typography>

        <IconButton edge="start" color="inherit" aria-label="new-list" onClick={openForm}>
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

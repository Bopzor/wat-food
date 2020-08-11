import React from 'react';

import { useTheme } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SwipeableListItem from 'mui-swipeable-list-item';
import { useHistory } from 'react-router';

import { GroceryList } from '../ListsPage/ListsPage';

type ListItemProps = {
  list: GroceryList;
  index: number;
  deleteItem: (index: number) => void;
};

const ListItem: React.FC<ListItemProps> = ({ list, index, deleteItem }) => {
  const theme = useTheme();
  const history = useHistory();

  const background = {
    actionIconLeft: <DeleteIcon />,
    actionIconRight: <DeleteIcon />,
    backgroundColorLeft: theme.palette.secondary.main,
    backgroundColorRight: theme.palette.secondary.main,
  };

  const isDone = (): boolean => {
    return list.items.every((item) => item.checked);
  };

  return (
    <SwipeableListItem
      background={background}
      onSwipedLeft={(): void => deleteItem(index)}
      onSwipedRight={(): void => deleteItem(index)}
      ListItemProps={{
        disabled: isDone(),
        onClick: (): void => history.push(`/${list.name}`, { list, index }),
        divider: true,
      }}
      primaryText={list.name}
    />
  );
};

export default ListItem;

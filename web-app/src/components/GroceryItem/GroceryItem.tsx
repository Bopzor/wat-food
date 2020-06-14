import React from 'react';

import { useTheme } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import SwipeableListItem from 'mui-swipeable-list-item';

import { GroceryItemType } from '../AddGroceryItem/AddGroceryItem';

type GroceryItemProps = {
  item: GroceryItemType;
  checkItem: (item: GroceryItemType) => void;
  deleteItem: (item: GroceryItemType) => void;
};

const GroceryItem: React.FC<GroceryItemProps> = ({ item, checkItem, deleteItem }) => {
  const theme = useTheme();

  const background = {
    actionIconLeft: <DeleteIcon />,
    actionIconRight: <DeleteIcon />,
    backgroundColorLeft: theme.palette.secondary.main,
    backgroundColorRight: theme.palette.secondary.main,
  };

  return (
    <SwipeableListItem
      background={background}
      onSwipedLeft={(): void => deleteItem(item)}
      onSwipedRight={(): void => deleteItem(item)}
      ListItemProps={{ disabled: item.checked, onClick: (): void => checkItem(item), divider: true }}
      itemIcon={
        <Checkbox edge="start" checked={item.checked} inputProps={{ 'aria-label': `item state ${item.name}` }} />
      }
      primaryText={item.name}
    />
  );
};

export default GroceryItem;

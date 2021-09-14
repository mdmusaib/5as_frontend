import React from 'react';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import FlagIcon from '@material-ui/icons/Flag';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import GitHubIcon from '@material-ui/icons/GitHub';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/styles';
import { lighten } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  list: {
    borderTop: `1px solid ${theme.palette.sidebar.borderColor}`,
    padding: '30px 24px',
    marginTop: 10,
    '.Cmt-miniLayout .Cmt-sidebar-content:not(:hover) &': {
      padding: '30px 20px',
    },
  },
  listItem: {
    borderRadius: theme.shape.borderRadius,
    transition: 'all 0.3s ease',

    '.Cmt-miniLayout .Cmt-sidebar-content:not(:hover) &': {
      width: 40,
      height: 40,
      padding: 3,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& .MuiListItemIcon-root': {
        marginTop: 0,
      },
    },
    '&:not(:last-child)': {
      marginBottom: 16,
    },

    '& .MuiListItemIcon-root': {
      minWidth: 'auto',
      color: lighten(theme.palette.common.black, 0.5),
    },
    '& .MuiListItemText-root': {
      marginLeft: 20,

      '.Cmt-miniLayout .Cmt-sidebar-content:not(:hover) &': {
        display: 'none',
      },
    },
  },
}));

const buttons = [];

const SidebarButtons = () => {
  const classes = useStyles();
  return (
    <List className={classes.list} disablePadding>
      {buttons.map((button, index) => (
        <ListItem
          key={index}
          alignItems="flex-start"
          button
          component="a"
          href={button.link}
          target="_blank"
          style={{
            backgroundColor: button.backgroundColor,
            color: button.title.color,
          }}
          className={classes.listItem}>
          <ListItemIcon style={{ color: button.title.color }}>{button.icon}</ListItemIcon>
          <ListItemText
            primary={button.title.text}
            secondary={button.subTitle ? button.subTitle.text : ''}
            secondaryTypographyProps={{
              style: button.subTitle ? { color: button.subTitle.color } : {},
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarButtons;

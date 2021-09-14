import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Button, fade, FormControl, MenuItem, TextField } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  tableRowRoot: {
    position: 'relative',
    transition: 'all .2s',
    borderTop: `solid 1px ${theme.palette.borderColor.main}`,
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.08),
      transform: 'translateY(-4px)',
      boxShadow: `0 3px 10px 0 ${fade(theme.palette.common.dark, 0.2)}`,
      borderTopColor: 'transparent',
      '& $tableCellRoot': {
        color: theme.palette.text.primary,
        '&:last-child': {
          color: theme.palette.error.main,
        },
        '&.success': {
          color: theme.palette.success.main,
        },
      },
    },
    '&:last-child': {
      borderBottom: `solid 1px ${theme.palette.borderColor.main}`,
    },
  },
  tableCellRoot: {
    padding: 16,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.text.secondary,
    borderBottom: '0 none',
    position: 'relative',
    '&:first-child': {
      paddingLeft: 24,
    },
    '&:last-child': {
      textAlign: 'right',
      color: theme.palette.error.main,
      paddingRight: 24,
    },
    '&.success': {
      color: theme.palette.success.main,
    },
  },
}));

const ReminderTableItem = ({ row }) => {
  const classes = useStyles();
  const status = [
    {
      label: 'captured',
      value: 'captured',
    },
    {
      label: 'cancelled',
      value: 'cancelled',
    },
  ];
  return (
    <TableRow className={classes.tableRowRoot}>
      <TableCell style={{ width: '20%', padding: '0 5%' }}>
        <NotificationsIcon />
      </TableCell>
      <TableCell className={classes.tableCellRoot}>
        <div>{row['id']}</div>
        <div style={{ color: 'rgb(63, 81, 181)', fontWeight: 'bold ' }}>Vaishaly Komagan</div>
        {row['contact_number']}
      </TableCell>
      <TableCell className={classes.tableCellRoot}>
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: '#3f51b5', cursor: 'pointer' }}
          onClick={e => {
            window.location.pathname = `app/lead/${row['id']}`;
          }}>
          View
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ReminderTableItem;

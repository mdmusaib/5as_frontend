import React, { useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { fade, FormControl, MenuItem, TextField } from '@material-ui/core';
import moment from 'moment';
import { leads } from '@fake-db';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
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

const TableItem = ({ row, updateStatus, updateFollowupDate, updateFollowupDate2 }) => {
  console.log('updateFollowupDate2 LeadsTable', updateFollowupDate2);
  const classes = useStyles();
  const status = leads.leadstatus;
  const [newstatus, setnewstatus] = useState(row['status'] ? row['status'] : 'CAPTURED');
  const statusUpdate = e => {
    setnewstatus(e.target.value);
    updateStatus({
      current_status: e.target.value,
      id: row.id,
    });
  };
  return (
    <TableRow className={classes.tableRowRoot}>
      <TableCell className={classes.tableCellRoot}>{row['id']}</TableCell>
      <TableCell className={classes.tableCellRoot}>{moment(row['lead_date']).format('DD MMM YYYY')}</TableCell>
      <TableCell className={classes.tableCellRoot}>{row['name']}</TableCell>
      <TableCell className={classes.tableCellRoot}>{row['contact_number'] ? row['contact_number'] : '---'}</TableCell>
      <TableCell className={classes.tableCellRoot}>
        {row['events'] &&
          row['events'].map((e, index) => {
            if (index === row['events'].length - 1) {
              return e.name;
            } else {
              return `${e.name}, `;
            }
          })}
      </TableCell>
      <TableCell className={classes.tableCellRoot}>
        {' '}
        <FormControl style={{ width: '100%' }} variant="outlined">
          <TextField
            variant="outlined"
            select
            label="Choose Status"
            required
            size="small"
            value={newstatus}
            onChange={statusUpdate}>
            {' '}
            {status.map((option, index) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </TableCell>
      <TableCell className={classes.tableCellRoot}>{row['final_quote'] ? row['final_quote'] : '---'}</TableCell>
      <TableCell className={classes.tableCellRoot}>
        {row['follow_up_date'] ? moment(row['follow_up_date']).format('DD MMM YYYY') : '---'}
      </TableCell>
      <TableCell className={classes.tableCellRoot}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<EditIcon />}
          onClick={e => {
            window.location.pathname = `app/lead/${row['id']}`;
          }}>
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

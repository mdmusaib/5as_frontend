import React, { useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { KeyboardDatePicker, KeyboardDateTimePicker, KeyboardTimePicker } from '@material-ui/pickers';

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
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 200,
    fontSize: '10px',
    paddingTop: '5.5px',
    paddingBottom: '5.5px',
  },
}));

const TableItem = ({ row, updateStatus, updateFollowupDate }) => {
  console.log('--row--', row);
  const classes = useStyles();
  const status = leads.leadstatus;
  const [selectedDate, setSelectedDate] = React.useState(row['follow_up_date'] ? row['follow_up_date'] : null);
  const [newstatus, setnewstatus] = useState(row['status'] ? row['status'] : 'CAPTURED');
  const statusUpdate = e => {
    setnewstatus(e.target.value);
    updateStatus({
      current_status: e.target.value,
      id: row.id,
    });
  };

  // const handleDateChange = date => {
  //   setSelectedDate(date);
  // };

  const handleDateChange = date => {
    setSelectedDate(date);
    //alert(date);
    updateFollowupDate({
      next_follow_up: date,
      id: row.id,
    });
  };

  // const followupUpdate = e => {
  //   alert(e.target.value);
  // setnewstatus(e.target.value);
  // updateStatus({
  //   current_status: e.target.value,
  //   id: row.id,
  // });
  // };
  const local = JSON.parse(localStorage.getItem("user"))
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
      <TableCell className={classes.tableCellRoot}>{row['status']}</TableCell>
      <TableCell className={classes.tableCellRoot}>{row['final_quote'] ? row['final_quote'] : 'Final Quote  '}</TableCell>
      <TableCell className={classes.tableCellRoot}>
        {row['follow_up_date'] ? moment(row['follow_up_date']).format('DD MMM YYYY') : 'Date'}
      </TableCell>
      {
        local.role !== 2 && <TableCell className={classes.tableCellRoot}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<EditIcon />}
            onClick={e => {
              window.location.pathname = `/app/project/edit/${row["id"]}`;
            }}>
            View
  </Button>
        </TableCell>
      }

    </TableRow>
  );
};

export default TableItem;

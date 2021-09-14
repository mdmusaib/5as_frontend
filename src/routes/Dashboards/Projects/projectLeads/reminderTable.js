import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import ReminderTableItem from './ReminderTableItem';
import Box from '@material-ui/core/Box';
import { TableCell, TablePagination, TableRow } from '@material-ui/core';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';

const ReminderTable = ({ tableData, name }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan="3">
              <h3 style={{ display: 'flex', alignItems: 'center', padding: '0 3%' }}>
                {' '}
                <NotificationsActiveIcon /> &nbsp;&nbsp; Reminders for {name}
              </h3>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.length > 0 && tableData.map((row, index) => <ReminderTableItem row={row} key={index} />)}
          {tableData.length === 0 && (
            <div
              style={{
                top: '67%',
                right: '45%',
                position: 'sticky',
                padding: 150,
              }}>
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '16px',
                  }}>
                  You don't have reminders to followUp...
                </div>
                <br />
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <NotificationsOffIcon style={{ fontSize: '60px' }} />
                </div>
              </div>
            </div>
          )}
        </TableBody>
      </Table>
      {tableData.length > 0 && (
        <TablePagination
          component="div"
          count={tableData.length}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Box>
  );
};

export default ReminderTable;

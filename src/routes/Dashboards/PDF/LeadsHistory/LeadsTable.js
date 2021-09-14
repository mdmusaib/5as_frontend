import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import Box from '@material-ui/core/Box';
import { TablePagination } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LeadsTable = ({ tableData, updateStatus, updateFollowupDate, updateFollowupDate2 }) => {
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
    <Box className="Cmt-table-responsive">
      <Table>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableItem
              row={row}
              key={index}
              updateStatus={updateStatus}
              updateFollowupDate={updateFollowupDate}
              updateFollowupDate2={updateFollowupDate2}
            />
          ))}
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

export default LeadsTable;

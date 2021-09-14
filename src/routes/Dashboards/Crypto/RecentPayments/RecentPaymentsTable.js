import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { crypto } from '../../../../@fake-db';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import Box from '@material-ui/core/Box';

const RecentPaymentsTable = () => {
  return (
    <Box className="Cmt-table-responsive">
      <Table>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {crypto.payments.map(row => (
            <TableItem row={row} key={row.id} />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default RecentPaymentsTable;

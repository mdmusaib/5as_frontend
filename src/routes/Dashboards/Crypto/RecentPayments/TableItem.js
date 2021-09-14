import React, { useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CmtObjectSummary from '../../../../@coremat/CmtObjectSummary';
import Box from '@material-ui/core/Box';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { timeFromNow } from '../../../../@jumbo/utils/dateHelper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import { ArrowUpward } from '@material-ui/icons';
import { fade } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  tableRowRoot: {
    position: 'relative',
    transition: 'all .2s',
    borderTop: `solid 1px ${theme.palette.borderColor.main}`,
    '&:hover, &.active': {
      backgroundColor: fade(theme.palette.primary.main, 0.08),
      '& $tableCellRoot, & $titleRoot': {
        color: theme.palette.text.primary,
      },
      '& $showContent': {
        width: 0,
      },
      '& $hideContent': {
        transform: 'translateX(0)',
        width: '100%',
      },
    },
    '&:last-child': {
      borderBottom: `solid 1px ${theme.palette.borderColor.main}`,
    },
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: `0 3px 10px 0 ${fade(theme.palette.common.dark, 0.2)}`,
      borderTopColor: 'transparent',
    },
    '&.collapse-table-row': {
      borderTop: '0 none',
      '& $tableCellRoot': {
        padding: 0,
      },
    },
    '&.active': {
      borderTop: '0 none',
      '&:hover': {
        transform: 'none',
        boxShadow: 'none',
      },
    },
  },
  tableCellRoot: {
    padding: 6,
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
      paddingRight: 24,
    },
  },
  tableCellFirst: {
    width: '50%',
  },
  tableCellSecond: {
    width: '25%',
  },
  tableCellHideShow: {
    width: '25%',
  },
  titleRoot: {
    color: theme.palette.text.secondary,
    letterSpacing: 0.25,
  },
  hideShowContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  showContent: {
    transition: 'all 0.3s ease-in-out',
    width: '100%',
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
  },
  hideContent: {
    transition: 'all 0.3s ease-in-out',
    transform: 'translateX(110%)',
    overflow: 'hidden',
  },
  hideShowLink: {
    cursor: 'pointer',
  },
  collapseTable: {
    paddingLeft: 60,
    '& td': {
      color: theme.palette.text.secondary,
      fontSize: 12,
      letterSpacing: 0.4,
      padding: 0,
      borderBottom: '0 none',
    },
  },
  openDataRot: {
    color: theme.palette.text.secondary,
    fontSize: 12,
    letterSpacing: 0.4,
    paddingLeft: 63,
    textAlign: 'left',
    paddingBottom: 10,
    marginTop: -15,
  },
}));

const TableItem = ({ row }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow className={clsx(classes.tableRowRoot, open ? 'active' : '')}>
        <TableCell className={clsx(classes.tableCellRoot, classes.tableCellFirst)}>
          <CmtObjectSummary
            avatar={<CmtAvatar src={row.user.avatar} alt={row.user.name} />}
            title={row.user.name}
            titleProps={{ className: classes.titleRoot }}
            showItemBadge={false}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            align={'horizontal'}
          />
        </TableCell>
        <TableCell className={clsx(classes.tableCellRoot, classes.tableCellSecond)}>
          {timeFromNow(row.lastPaymentDate)}
        </TableCell>
        <TableCell className={clsx(classes.tableCellRoot, classes.tableCellHideShow)} onClick={() => setOpen(!open)}>
          <Box className={classes.hideShowContent}>
            <Box className={classes.showContent}>${row.pendingAmount}</Box>
            <Box
              className={clsx(classes.hideContent, classes.hideShowLink)}
              color="primary.main"
              display="flex"
              alignItems="center"
              justifyContent="flex-end">
              <Box component="span" fontWeight={700} mr={2}>
                {open ? 'HIDE' : 'DETAIL'}
              </Box>
              {open ? <ArrowUpward fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
            </Box>
          </Box>
        </TableCell>
      </TableRow>

      <TableRow className={clsx(classes.tableRowRoot, open ? 'active' : 'collapse-table-row')}>
        <TableCell className={classes.tableCellRoot} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className={classes.openDataRot}>
              <Box>{row.user.position}</Box>
              <Box display="flex" alignItems="center">
                <Box mr={3}>
                  Total{' '}
                  <Box component="span" fontWeight="fontWeightRegular" color="text.primary">
                    Hours: {row.rate}
                  </Box>
                </Box>

                <Box mr={3}>
                  Rate:{' '}
                  <Box component="span" fontWeight="fontWeightRegular" color="text.primary">
                    {row.rate}
                  </Box>
                </Box>

                <Box>
                  Pending{' '}
                  <Box component="span" fontWeight="fontWeightRegular" color="text.primary">
                    ${row.pendingAmount}
                  </Box>
                </Box>
                <Box ml="auto">
                  <Button size="small" variant="contained" color="primary">
                    Pay Now
                  </Button>
                </Box>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default TableItem;

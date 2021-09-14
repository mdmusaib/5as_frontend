import React from 'react';
import { Box, TableBody, TableCell, TableRow, fade, Table } from '@material-ui/core';
import CmtTimeLine from '../../../../@coremat/CmtTimeLine';
import CmtTimeLineItem from '../../../../@coremat/CmtTimeLine/CmtTimeLineItem';
import CmtTimelineContent from '../../../../@coremat/CmtTimeLine/CmtTimelineContent';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CmtImage from '../../../../@coremat/CmtImage';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  timelineView: {
    position: 'relative',
    '& .Cmt-timeline-item': {
      paddingLeft: 64,
      '&:before': {
        left: 20,
      },
      '&:first-child:before, &:last-child:before': {
        borderLeftStyle: 'solid',
      },
      '& .Cmt-timeline-badge': {
        transition: 'all 0.3s ease',
        transform: 'scale(1)',
      },
      '&:hover': {
        '& .Cmt-timeline-badge': {
          boxShadow: '0 4px 8px rgba(0,0,0,.45)',
          transform: 'scale(1.2)',
        },
      },
    },
    '& .Cmt-timeline-badge': {
      top: 0,
      width: 40,
      height: 40,
    },
  },
  titleRoot: {
    fontWeight: theme.typography.fontWeightRegular,
    letterSpacing: 0.5,
    marginBottom: 4,
    cursor: 'pointer',
  },
  subTitleRoot: {
    fontSize: 12,
    letterSpacing: 0.4,
    color: theme.palette.text.secondary,
  },
  dateRoot: {
    fontSize: 12,
    letterSpacing: 0.4,
    color: theme.palette.text.disabled,
    textAlign: 'right',
  },
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

const Communication = ({ data }) => {
  const classes = useStyles();
  return (
    <Box className={classes.timelineView}>
      <CmtTimeLine align={'left'}>
        <Table>
          <TableBody>
            {data.map((item, index) => (
              <TableRow className={classes.tableRowRoot}>
                <TableCell className={classes.tableCellRoot}>{moment(item['created_at']).format('MMM DD YYYY')}</TableCell>
                <TableCell className={classes.tableCellRoot}>{item['type']}</TableCell>
                <TableCell className={classes.tableCellRoot}>{item['content']}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CmtTimeLine>
    </Box>
  );
};

export default Communication;

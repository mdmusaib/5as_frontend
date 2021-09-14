import React, { useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import { fade, Tooltip } from '@material-ui/core';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import CmtProgressBar from '../../../../@coremat/CmtProgressBar';
import CmtAvatarGroup from '../../../../@coremat/CmtAvatarGroup';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import CmtObjectSummary from '../../../../@coremat/CmtObjectSummary';
import CmtList from '../../../../@coremat/CmtList';
import { intranet } from '../../../../@fake-db';
import clsx from 'clsx';
import AddProjectPopup from './AddProjectPopup';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import InfoIcon from '@material-ui/icons/Info';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyles = makeStyles(theme => ({
  actionsRoot: {
    transition: 'all 0.3s ease',
    transform: 'translateX(-110%)',
    opacity: 0,
    visibility: 'hidden',
    marginLeft: 10,
  },
  hoverAction: {
    '&:hover $actionsRoot': {
      transform: 'translateX(0%)',
      opacity: 1,
      visibility: 'visible',
    },
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
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.text.primary,
    borderBottom: '0 none',
    '&:first-child': {
      paddingLeft: 24,
    },
    '&:last-child': {
      textAlign: 'right',
      paddingRight: 24,
    },
    '& .Cmt-avatar-more': {
      fontSize: 10,
      color: theme.palette.primary.main,
    },
  },
  tableCellSecondaryColor: {
    color: theme.palette.text.secondary,
  },
  blockRoot: {
    display: 'block',
    fontSize: 14,
  },
  tooltip: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}));

const actions = [
  {
    icon: <AllInclusiveIcon />,
    label: 'More Detail',
  },
  {
    icon: <InfoIcon />,
    label: 'See View',
  },
];

const TableItem = ({ row }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [team, setTeam] = React.useState(intranet.members.filter(item => row.team.some(id => id === item.id)));

  const handleDialog = event => {
    setAnchorEl(event.currentTarget);
  };

  const getProgressBarColor = React.useCallback(value => {
    if (value <= 25) {
      return '#E73145';
    } else if (value > 25 && value <= 50) {
      return '#F39711';
    } else return '#3BD27C';
  }, []);

  const moreItemsTooltip = React.useCallback(
    data => <CmtList data={data} renderRow={(item, index) => <Box key={index}>{item.name}</Box>} />,
    [],
  );

  return (
    <TableRow className={clsx(classes.hoverAction, classes.tableRowRoot)}>
      <TableCell className={classes.tableCellRoot}>
        <Box>{row.name}</Box>
      </TableCell>
      <TableCell className={clsx(classes.tableCellRoot, classes.tableCellSecondaryColor)}>
        <Box display="flex" alignItems="center">
          <Box component="span" mr={1} fontSize={12}>
            {row.dueDate}
          </Box>
          {row.isDelayed ? <Chip label="Delayed" color="secondary" size="small" /> : null}
        </Box>
      </TableCell>

      <TableCell className={classes.tableCellRoot} style={{ width: 140 }}>
        <CmtProgressBar hideValue value={row.progress} containedColor={getProgressBarColor(row.progress)} onlyContained />
      </TableCell>

      <TableCell className={classes.tableCellRoot}>
        <Box display="flex" alignItems="center">
          <CmtAvatarGroup
            items={team}
            srcKey="profilePic"
            spacing={6}
            max={4}
            avatarSize={24}
            titleKey="name"
            tooltipProps={{ classes: { tooltip: classes.tooltip } }}
            renderItemSummary={(item, index) => (
              <Box p={1}>
                <CmtObjectSummary
                  key={index}
                  avatar={<CmtAvatar size={30} src={item.profilePic} />}
                  title={item.name}
                  subTitle={`@${item.username}`}
                  align={'horizontal'}
                />
              </Box>
            )}
            renderMore={moreItemsTooltip}
          />
          <Box className={classes.actionsRoot}>
            <IconButton size="small" onClick={handleDialog}>
              <PersonAddIcon />
            </IconButton>
          </Box>
        </Box>
        <AddProjectPopup
          options={intranet.members}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          team={team}
          setTeam={setTeam}
        />
      </TableCell>
      <TableCell className={classes.tableCellRoot}>
        <CmtDropdownMenu
          TriggerComponent={
            <Tooltip title="More">
              <IconButton size="small">
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
          }
          items={actions}
        />
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

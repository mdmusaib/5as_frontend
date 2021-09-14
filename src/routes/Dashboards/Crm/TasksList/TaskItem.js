import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import { crm } from '../../../../@fake-db';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import CmtList from '../../../../@coremat/CmtList';
import moment from 'moment';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core';
import clsx from 'clsx';
import GridContainer from '../../../../@jumbo/components/GridContainer';

const useStyles = makeStyles(theme => ({
  taskItemRoot: {
    padding: '7px 24px 7px 12px',
    transition: 'all .2s',
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.04),
      transform: 'translateY(-4px)',
      boxShadow: `0 3px 10px 0 ${fade(theme.palette.common.dark, 0.2)}`,
      '& $titleRoot': {
        color: theme.palette.text.primary,
      },
    },
  },
  titleRoot: {
    color: theme.palette.text.disabled,
    fontSize: 16,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  dots: {
    height: 8,
    width: 8,
    borderRadius: '50%',
    marginRight: 10,
  },
  gridItemCenter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      alignItems: 'flex-end',
    },
  },
  tag_danger: {
    backgroundColor: theme.palette.error.main,
  },
  tag_success: {
    backgroundColor: theme.palette.success.main,
  },
  tag_info: {
    backgroundColor: theme.palette.info.main,
  },
  tag_warning: {
    backgroundColor: theme.palette.warning.main,
  },
}));
const TaskItem = ({ item }) => {
  const [isCompleted, setIsCompleted] = useState(item.completed);
  const { taskTags } = crm;

  const getDateText = () => {
    const date = item.dueDate;
    if (moment().isSame(date, 'day')) {
      return (
        <Box component="span" ml={3} fontSize={12} fontWeight="fontWeightBold">
          Today
        </Box>
      );
    } else if (
      moment()
        .subtract(1, 'days')
        .isSame(date, 'day')
    ) {
      return (
        <Box component="span" ml={3} fontSize={12} color="error.main" fontWeight="fontWeightBold">
          Yesterday
        </Box>
      );
    } else {
      return (
        <Box component="span" ml={3} fontSize={12} fontWeight="fontWeightBold">
          {moment(date).format('DD MMM')}
        </Box>
      );
    }
  };

  const classes = useStyles();

  return (
    <Box className={classes.taskItemRoot}>
      <GridContainer>
        <Grid item xs={12} sm={8}>
          <Box display="flex" alignItems="center">
            <Box mr={2}>
              <Checkbox checked={isCompleted} onChange={e => setIsCompleted(e.target.checked)} />
            </Box>
            <Typography className={classes.titleRoot}>{item.description}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.gridItemCenter}>
          <Box display="flex" alignItems="center" pl={{ xs: 3.5, sm: 0 }} mt={{ xs: -3, sm: 0 }}>
            <CmtList
              style={{ display: 'flex' }}
              data={item.tags}
              renderRow={(item, index) => {
                const selectedTag = taskTags.find(tag => tag.id === item);
                return (
                  <Tooltip title={selectedTag.name} key={index}>
                    <Box className={clsx(classes.dots, classes[`tag_${selectedTag.color}`])} />
                  </Tooltip>
                );
              }}
            />
            <Box ml={4}>
              {item.user.profilePic ? (
                <CmtAvatar size={24} src={item.user.profilePic} alt={item.user.name} />
              ) : (
                <CmtAvatar size={24} alt={item.user.name}>
                  {item.user.name.charAt(0)}
                </CmtAvatar>
              )}
            </Box>
            {getDateText()}
          </Box>
        </Grid>
      </GridContainer>
    </Box>
  );
};

export default TaskItem;

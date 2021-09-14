import React from 'react';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtAdvCardContent from '../../../../@coremat/CmtAdvCard/CmtAdvCardContent';
import CmtAdvCard from '../../../../@coremat/CmtAdvCard';

import { crm } from '../../../../@fake-db';
import makeStyles from '@material-ui/core/styles/makeStyles';
import GrowthGraph from './GrowthGraph';
import Box from '@material-ui/core/Box';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  cardContentRoot: {
    '& .MuiGrid-container': {
      alignItems: 'center',
    },
  },
  contentTitleRoot: {
    color: theme.palette.success.main,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 6,
    '& .MuiSvgIcon-root': {
      fontSize: 18,
      marginLeft: 8,
    },
  },
  subTitleRoot: {
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
  growthGraphRoot: {
    margin: '-37px -24px -24px -24px',
  },
}));

const Growth = () => {
  const classes = useStyles();
  const { revenueHistory } = crm;
  return (
    <CmtAdvCard>
      <CmtCardHeader
        titleProps={{
          variant: 'h4',
          component: 'div',
        }}
        title={'Growth'}
      />
      <CmtAdvCardContent
        className={classes.cardContentRoot}
        columnSizes={[4, 8]}
        title={
          <Typography component="div" variant="h3" className={classes.contentTitleRoot}>
            37% <ArrowUpwardIcon />
          </Typography>
        }
        subTitle={'This year'}
        subTitleProps={{
          variant: 'body2',
          component: 'p',
          className: classes.subTitleRoot,
        }}
        reverseDir>
        <Box className={classes.growthGraphRoot}>
          <GrowthGraph revenueHistory={revenueHistory} />
        </Box>
      </CmtAdvCardContent>
    </CmtAdvCard>
  );
};

export default Growth;

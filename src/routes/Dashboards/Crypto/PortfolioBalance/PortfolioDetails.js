import React from 'react';
import Box from '@material-ui/core/Box';
import ProgressIndicator from './ProgressIndicator';
import CmtList from '../../../../@coremat/CmtList';
import { crypto } from '../../../../@fake-db';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
  titleRoot: {
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  listItemRoot: {
    padding: 0,
    marginBottom: 4,
  },
}));

const PortfolioDetails = () => {
  const classes = useStyles();
  return (
    <Box width={1}>
      <Typography component="div" variant="h6" className={classes.titleRoot}>
        Portfolio Distribution
      </Typography>
      <CmtList
        data={crypto.wallets}
        renderRow={(item, index) => <ProgressIndicator key={index} className={classes.listItemRoot} item={item} />}
      />
    </Box>
  );
};

export default PortfolioDetails;

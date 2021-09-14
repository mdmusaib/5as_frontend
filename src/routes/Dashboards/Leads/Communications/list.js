import React from 'react';
import CmtCard from '../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import { intranet } from '../../../../@fake-db';
import { timeFromNow } from '../../../../@jumbo/utils/dateHelper';
import PerfectScrollbar from 'react-perfect-scrollbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Communication from './communication';

const useStyles = makeStyles(theme => ({
  cardRoot: {
    position: 'relative',
  },
  scrollbarRoot: {
    height: 300,
    marginRight: -24,
    paddingRight: 24,
    marginLeft: -24,
    paddingLeft: 24,
    marginTop: -5,
    paddingTop: 5,
  },
}));

const CommunicationList = props => {
  const classes = useStyles();
  // debugger;
  const { userActivities } = intranet;
  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader
        title={props.title}
        subTitle={props.data.length > 0 ? `Last communcation was ${timeFromNow(props.data[0]['created_at'])}` : ''}
      />
      <CmtCardContent>
        <PerfectScrollbar className={classes.scrollbarRoot}>
          <Communication data={props.data} />
        </PerfectScrollbar>
      </CmtCardContent>
    </CmtCard>
  );
};

export default CommunicationList;

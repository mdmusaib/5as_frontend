import React, { useState } from 'react';
import CmtCard from '../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import Chip from '@material-ui/core/Chip';
import { intranet } from '../../../../@fake-db';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import CmtList from '../../../../@coremat/CmtList';
import PerfectScrollbar from 'react-perfect-scrollbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { fade } from '@material-ui/core';
import ProjectInvitation from './ProjectInvitation';
import PhotosUploaded from './PhotosUploaded';
import SharedPost from './SharedPost';

const useStyles = makeStyles(theme => ({
  cardRoot: {
    position: 'relative',
    '& .Cmt-card-content': {
      padding: 0,
      paddingBottom: 24,
      borderTop: `1px solid ${fade(theme.palette.common.dark, 0.035)}`,
    },
  },
  scrollbarRoot: {
    height: 280,
  },
  chipRoot: {
    backgroundColor: fade(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
    letterSpacing: 0.25,
    fontSize: 14,
  },
}));

const contentTypes = {
  PROJECT_INVITATION: React.memo(ProjectInvitation),
  PHOTOS_UPLOADED: React.memo(PhotosUploaded),
  SHARED_POST: React.memo(SharedPost),
};

const DailyFeed = () => {
  const { dailyFeed } = intranet;
  const [feed, setFeed] = useState(dailyFeed);
  const classes = useStyles();

  const updateFeed = React.useCallback(item => {
    const updatedFeed = feed.map(feedItem => (feedItem.id === item.id ? item : feedItem));
    setFeed(updatedFeed);
  }, []);

  const renderItem = (item, index) => {
    const RenderContent = contentTypes[item.type];
    return <RenderContent key={index} item={item} updateFeed={updateFeed} />;
  };

  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader title="Your Daily Feed">
        <Chip className={classes.chipRoot} label="23 New" color="primary" size="small" />
      </CmtCardHeader>
      <CmtCardContent>
        <PerfectScrollbar className={classes.scrollbarRoot}>
          <CmtList data={feed} renderRow={renderItem} />
        </PerfectScrollbar>
      </CmtCardContent>
    </CmtCard>
  );
};

export default DailyFeed;

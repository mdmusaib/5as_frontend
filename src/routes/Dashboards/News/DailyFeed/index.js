import React, { useState } from 'react';
import CmtCard from '../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import Chip from '@material-ui/core/Chip';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import CmtList from '../../../../@coremat/CmtList';
import PerfectScrollbar from 'react-perfect-scrollbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { fade } from '@material-ui/core';
import ProjectInvitation from './ProjectInvitation';
import PhotosUploaded from './PhotosUploaded';
import SharedPost from './SharedPost';
import { news } from '../../../../@fake-db/dashboards/news';

const useStyles = makeStyles(theme => ({
  cardRoot: {
    position: 'relative',
    '& .Cmt-card-content': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  scrollbarRoot: {
    maxHeight: 400,
  },
  chipRoot: {
    backgroundColor: fade(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
    letterSpacing: 0.25,
    fontSize: 14,
  },
}));

const contentTypes = {
  PROJECT_INVITATION: ProjectInvitation,
  PHOTOS_UPLOADED: PhotosUploaded,
  SHARED_POST: SharedPost,
};

const DailyFeed = () => {
  const { dailyFeed } = news;
  const [feed, setFeed] = useState(dailyFeed);
  const classes = useStyles();

  const updateFeed = item => {
    const updatedFeed = feed.map(feedItem => (feedItem.id === item.id ? item : feedItem));
    setFeed(updatedFeed);
  };

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

import React, { useEffect, useState } from 'react';
import useStyles from './BaseItem.style';
import Box from '@material-ui/core/Box';
import BaseItem from './BaseItem';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ShareIcon from '@material-ui/icons/Share';

const SharedPost = ({ item, updateFeed }) => {
  const classes = useStyles();
  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);

  useEffect(() => {
    if (isLiked) {
      item.likes--;
    } else {
      item.likes--;
    }

    updateFeed(item);
  }, [isLiked]);

  useEffect(() => {
    if (isShared) {
      item.shares++;
    } else {
      item.shares--;
    }

    updateFeed(item);
  }, [isShared]);

  const toggleLikeStatus = () => {
    setIsLiked(!isLiked);
  };

  const toggleIsShared = () => {
    setIsShared(!isShared);
  };

  const getTitle = () => {
    return (
      <Box className={classes.titleRoot}>
        <Box component="span" color="primary.main">
          {item.metaData.user.name}
        </Box>
        <Box component="span" mx={1}>
          has shared a post saying
        </Box>
        <Box component="span">{`"${item.metaData.post.title}"`}</Box>
      </Box>
    );
  };

  const getActionComponent = () => (
    <Box display="flex" alignItems="center">
      <IconButton color={isLiked ? 'primary' : 'default'} onClick={toggleLikeStatus}>
        <ThumbUpIcon />
      </IconButton>
      <Box ml={1}>
        <IconButton color={isShared ? 'primary' : 'default'} onClick={toggleIsShared}>
          <ShareIcon />
        </IconButton>
      </Box>
    </Box>
  );

  return <BaseItem item={item} title={getTitle()} actionComponent={getActionComponent()} />;
};

export default SharedPost;

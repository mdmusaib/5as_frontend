import React, { useEffect, useLayoutEffect, useState } from 'react';
import CmtImage from '../../../../@coremat/CmtImage';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    borderRadius: 6,
    overflow: 'hidden',
    '&:hover': {
      '& $titleBar': {
        bottom: 0,
      },
    },
  },
  titleBar: {
    position: 'absolute',
    color: theme.palette.common.white,
    backgroundColor: fade(theme.palette.common.black, 0.8),
    bottom: '-100px',
    left: 0,
    right: 0,
    zIndex: 1,
    padding: '10px 16px',
    transition: 'all 0.3s ease',
  },
  titleRoot: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  subTitleRoot: {
    fontSize: 12,
    color: fade(theme.palette.common.white, 0.38),
  },
}));

const PictureItem = ({ item }) => {
  const classes = useStyles();
  const boxRef = React.createRef();
  const [boxHeight, setBoxHeight] = useState(0);
  const [dimensions, setDimensions] = React.useState({
    height: 0,
    width: 0,
  });

  const calculateHeight = () => {
    if (boxRef.current) {
      setBoxHeight(boxRef.current.clientWidth);
    }
  };

  useEffect(() => {
    calculateHeight();
  }, [item, dimensions]);

  useLayoutEffect(() => {
    function windowResized() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener('resize', windowResized);
    windowResized();
    return () => window.removeEventListener('resize', windowResized);
  }, []);

  return (
    <Box className={classes.root} ref={boxRef} style={{ height: boxHeight }}>
      <CmtImage src={item.photo_url} alt={item.caption} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
      <Box className={classes.titleBar}>
        <Typography component="div" variant="body1" className={classes.titleRoot}>
          {item.caption}
        </Typography>
        <Typography className={classes.subTitleRoot}>{item.size} Mb</Typography>
      </Box>
    </Box>
  );
};

export default PictureItem;

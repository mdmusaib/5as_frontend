import React, { useContext, useEffect, useState } from 'react';
import Tour from 'reactour';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import AppContext from '../../@jumbo/components/contextProvider/AppContextProvider/AppContext';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles(theme => ({
  root: {
    padding: '20px 16px !important',

    '& .sc-AxgMl': {
      boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2)',
      border: `1px solid ${theme.palette.common.white}`,
      borderRadius: theme.shape.borderRadius,
    },

    '& .reactour__close': {
      top: 11,
      right: 11,
      height: 10,
      width: 10,
      color: theme.palette.text.disabled,
    },
    '& .sc-AxheI': {
      justifyContent: 'space-between',
    },
  },
}));

export const tourConfig = [
  {
    selector: '[data-tut="reactour__customizer"]',
    content: (
      <Box>
        <Box component="h3" mb={2}>
          Customizer
        </Box>
        <Box color="text.secondary" fontSize={14}>
          Explore the features and flexibility by customizing options.
        </Box>
      </Box>
    ),
    position: 'left',
  },
  {
    selector: '[data-tut="reactour__localization"]',
    content: (
      <Box>
        <Box component="h3" mb={2}>
          Multilingual Support
        </Box>
        <Box color="text.secondary" fontSize={14}>
          Jumbo comes with both multilingual and RTL support.
        </Box>
      </Box>
    ),
    position: 'bottom',
  },
];

const TourGuide = () => {
  const classes = useStyles();
  const { showTourGuide, setTourGuideStatus } = useContext(AppContext);
  const [isOpen, setOpen] = useState(false);

  const disableBody = target => disableBodyScroll(target);
  const enableBody = target => enableBodyScroll(target);

  useEffect(() => {
    if (showTourGuide) {
      setTimeout(() => {
        setOpen(true);
      }, 300);
    }
  }, [showTourGuide]);

  const onTourClose = () => {
    setOpen(false);
    setTourGuideStatus(false);
  };

  const theme = useTheme();

  return (
    <Tour
      onAfterOpen={disableBody}
      onBeforeClose={enableBody}
      onRequestClose={onTourClose}
      steps={tourConfig}
      // maskClassName="mask"
      closeWithMask={true}
      maskSpace={10}
      isOpen={isOpen}
      className={classes.root}
      rounded={theme.overrides.MuiCard.root.borderRadius}
      accentColor={theme.palette.primary.main}
    />
  );
};

export default TourGuide;

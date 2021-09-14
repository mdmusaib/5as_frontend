import React, { useState } from 'react';
import ToggleHoverCard from '../../../../@jumbo/components/Common/ToggleHoverCard';
import Box from '@material-ui/core/Box';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import DataChart from './DataChart';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import useStyles from './index.style';

const AnalyticContent = ({ hovered, analyticData, primaryColor, secondaryColor }) => {
  const classes = useStyles();

  return hovered ? (
    <Box className={classes.toggleAnalyticsContent}>
      <Box className={classes.toggleAnalyticsContentInner}>
        <Typography className={classes.titleRoot} component="div" variant="h1">
          {analyticData.onHover.amount}
        </Typography>
        <Box display="flex" alignItems="center" component="p" color="text.secondary" whiteSpace="nowrap" fontSize={16}>
          <Box component="span">{analyticData.label}</Box>
          <Box display="flex" alignItems="center" component="span" ml={2} color={primaryColor.solid}>
            {analyticData.onHover.percentage}
            <Box component="span" ml={2}>
              <TrendingUpIcon />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  ) : (
    <Box className={classes.toggleAnalyticsContent}>
      <Box className={classes.toggleAnalyticsContentInner}>
        <Typography className={classes.titleRoot} component="div" variant="h1">
          {analyticData.amount}
        </Typography>
        <Box display="flex" alignItems="center" component="p" color="text.secondary" whiteSpace="nowrap" fontSize={16}>
          <Box component="span">{analyticData.label}</Box>
          <Box display="flex" alignItems="center" component="span" ml={2} color={secondaryColor.solid}>
            {analyticData.percentage}
            <Box component="span" ml={2}>
              <TrendingDownIcon />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const ToggleAnalyticsCard = ({ data }) => {
  const { title, hoverButton, primaryColor, secondaryColor, analyticData, chartData } = data;
  const { current, past } = chartData;
  const [hovered, setHovered] = useState(false);
  const [toggled, setToggled] = useState(false);
  const classes = useStyles();

  return (
    <ToggleHoverCard
      className={clsx(classes.toggleCardRoot, toggled ? 'chart-active' : '')}
      title={title}
      isHovered={setHovered}
      isToggled={setToggled}
      hoverAction={
        <Box
          component="span"
          className={classes.toggleHoverBtn}
          style={{
            backgroundColor: hovered ? primaryColor.solid : primaryColor.light,
            color: hovered ? hoverButton.hoverColor : hoverButton.color,
          }}>
          {hovered ? hoverButton.hoverText : hoverButton.text}
        </Box>
      }
      toggleAction={<ShowChartIcon color={toggled ? 'primary' : 'action'} />}>
      <AnalyticContent
        hovered={hovered}
        analyticData={analyticData}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />

      {toggled && (
        <Box className={classes.dataChartRoot}>
          <DataChart
            data={hovered ? past : current}
            color={hovered ? primaryColor.solid : secondaryColor.solid}
            bgColor={hovered ? primaryColor.light : secondaryColor.light}
          />
        </Box>
      )}
    </ToggleHoverCard>
  );
};

export default ToggleAnalyticsCard;

import React from 'react';
import Moment from 'moment';
import { Box } from '@material-ui/core';

const DayWeather = ({ data }) => {
  const temp = data.main.temp;
  const day = data.dt_txt;
  const iconId = data.weather[0].id;
  Moment.locale('en');

  return (
    <Box display="flex" flexDirection="row" mb={5} justifyContent="space-between" fontSize={16}>
      <Box>{Moment(day).format('ddd d MMM')}</Box>
      <Box>{temp.toFixed(1)} °C</Box>
      <Box>
        <i className={'wi wi-owm-' + iconId} />
      </Box>
    </Box>
  );
};

export default DayWeather;

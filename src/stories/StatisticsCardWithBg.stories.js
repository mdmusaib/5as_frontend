import StatisticsCardWithBg from '../@jumbo/components/Common/StatisticsCardWithBg';

import { text, withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import Box from '@material-ui/core/Box';
import InfoIcon from '@material-ui/icons/Info';

export default {
  title: 'Statistics Card with Bg',
  component: StatisticsCardWithBg,
  decorators: [withKnobs, withA11y],
};

export const Default = () => (
  <StatisticsCardWithBg
    backgroundColor={'#0795F4'}
    title={text('Header Title', '10,254')}
    subTitle={text('sub title', 'Online Signups')}
    icon={<InfoIcon style={{ color: '#fff' }} />}>
    <Box>This is demo child.</Box>
  </StatisticsCardWithBg>
);

import { text, withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import StatisticsModernCard from '../@jumbo/components/Common/StatisticsModernCard';
import Box from '@material-ui/core/Box';

export default {
  title: 'Statistics Modern Card',
  component: StatisticsModernCard,
  decorators: [withKnobs, withA11y],
};

export const Default = () => (
  <StatisticsModernCard
    backgroundColor={text('Card Bgcolor', '#6200EE')}
    title={text('Header Title', '10,254')}
    subTitle={text('sub title', 'Online Signups')}
    titleIcon={<InfoIcon style={{ color: '#fff' }} />}>
    <Box>This is demo child.</Box>
  </StatisticsModernCard>
);

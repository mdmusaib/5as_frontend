import { text, withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import Box from '@material-ui/core/Box';
import StatisticsCard from '../@jumbo/components/Common/StatisticsCard';

export default {
  title: 'Statistics Card',
  component: StatisticsCard,
  decorators: [withKnobs, withA11y],
};

export const Default = () => (
  <StatisticsCard
    backgroundColor={text('card background color', '#7D38DF')}
    title={text('Header Title', 'Card Title')}
    amount={text('amount', '2343')}
    description={text('content Subtitle', 'Some Content here')}>
    <Box>This is demo child.</Box>
  </StatisticsCard>
);

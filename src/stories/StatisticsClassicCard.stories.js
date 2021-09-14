import { array, number, object, text, withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import Box from '@material-ui/core/Box';
import StatisticsClassicCard from '../@jumbo/components/Common/StatisticsClassicCard';

export default {
  title: 'Statistics Classic Card',
  component: StatisticsClassicCard,
  decorators: [withKnobs, withA11y],
};

const labels = [
  { name: 'Sent', color: '#FFA800' },
  { name: 'Bounced', color: '#F3E5CF' },
];

export const Default = () => (
  <StatisticsClassicCard
    backgroundColor={['#E2EEFF -18.96%', '#FFF 108.17%']}
    gradientDirection="180deg"
    color={text('Text Color', '#4200FF')}
    title={text('Header Title', '10,254')}
    subTitle={text('sub title', 'Online Signups')}
    growth={number('change', 1.5)}>
    <Box>This is demo child.</Box>
  </StatisticsClassicCard>
);

export const withLabels = () => (
  <StatisticsClassicCard
    overlay={object('Overlay', {
      colors: ['#006aa8', 'green', 'yellow'],
      opacity: 0.3,
      direction: 'to right',
    })}
    color={text('Text Color', '#4200FF')}
    title={text('Header Title', '10,254')}
    subTitle={text('sub title', 'Online Signups')}
    growth={number('change', 1.5)}
    labels={array('graphProps', labels)}>
    <Box>This is demo child.</Box>
  </StatisticsClassicCard>
);

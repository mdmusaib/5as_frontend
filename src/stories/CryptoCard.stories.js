import { object, text, withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import { CryptoCard } from '../@jumbo/components/Common';
import Box from '@material-ui/core/Box';

export default {
  title: 'Crypto CryptoCard',
  component: CryptoCard,
  decorators: [withKnobs, withA11y],
};

const progress = { value: '14%', icon: 'info', color: 'red' };

export const Default = () => (
  <CryptoCard
    title={text('Header Title', 'Card Title')}
    amount={text('amount', '2343')}
    progress={object('Content Sub Title Props', progress)}>
    <Box>This is demo child.</Box>
  </CryptoCard>
);

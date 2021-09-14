import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import CryptoNews from '../routes/Dashboards/Crypto/CryptoNews';

export default {
  title: 'Crypto Crypto News',
  component: CryptoNews,
  decorators: [withKnobs, withA11y],
};

export const Default = () => <CryptoNews />;

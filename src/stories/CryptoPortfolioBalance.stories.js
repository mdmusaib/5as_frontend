import { object, withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import PortfolioBalance from '../routes/Dashboards/Crypto/PortfolioBalance';
import { portfolioData } from '../@fake-db';

export default {
  title: 'Crypto Portfolio Balance',
  component: PortfolioBalance,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <PortfolioBalance data={object('Content Data', portfolioData)} />;

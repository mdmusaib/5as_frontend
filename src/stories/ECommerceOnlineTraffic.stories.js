import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import OnlineTraffic from '../routes/Dashboards/ECommerce/OnlineTraffic';

export default {
  title: 'ECommerce OnlineTraffic',
  component: OnlineTraffic,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <OnlineTraffic />;

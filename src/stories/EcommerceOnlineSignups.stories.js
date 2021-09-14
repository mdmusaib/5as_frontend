import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import OnlineSignups from '../routes/Dashboards/ECommerce/OnlineSignups';

export default {
  title: 'ECommerce OnlineSignups',
  component: OnlineSignups,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <OnlineSignups />;

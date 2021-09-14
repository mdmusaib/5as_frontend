import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import SimpleNotifications from '../routes/Dashboards/ECommerce/SimpleNotifications';

export default {
  title: 'ECommerce SimpleNotifications',
  component: SimpleNotifications,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <SimpleNotifications />;

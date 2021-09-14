import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import TotalEmailSent from '../routes/Dashboards/ECommerce/TotalEmailSent';

export default {
  title: 'ECommerce TotalEmailSent',
  component: TotalEmailSent,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <TotalEmailSent />;

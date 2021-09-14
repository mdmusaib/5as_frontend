import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import ApplicationsSummary from '../routes/Dashboards/ECommerce/ApplicationsSummary';

export default {
  title: 'ECommerce ApplicationsSummary',
  component: ApplicationsSummary,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <ApplicationsSummary />;

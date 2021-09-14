import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import CurrentProjectsSummary from '../routes/Dashboards/Intranet/CurrentProjectsSummary';

export default {
  title: 'Intranet Current Projects Summary',
  component: CurrentProjectsSummary,
  decorators: [withKnobs, withA11y],
};

export const Default = () => <CurrentProjectsSummary />;

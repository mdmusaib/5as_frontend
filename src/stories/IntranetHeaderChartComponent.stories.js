import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import HeaderChartComponent from '../routes/Dashboards/Intranet/HeaderChartComponent';

export default {
  title: 'Intranet Header Chart Component',
  component: HeaderChartComponent,
  decorators: [withKnobs, withA11y],
};

export const Default = () => <HeaderChartComponent />;

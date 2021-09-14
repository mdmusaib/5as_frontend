import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import CitiesStatistics from '../routes/Dashboards/Listing/CitiesStatistics';

export default {
  title: 'Listing Cities Statistics',
  component: CitiesStatistics,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <CitiesStatistics />;

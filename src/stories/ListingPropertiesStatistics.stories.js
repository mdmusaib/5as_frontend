import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import PropertiesStatistics from '../routes/Dashboards/Listing/PropertiesStatistics';

export default {
  title: 'Listing Properties Statistics',
  component: PropertiesStatistics,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <PropertiesStatistics />;

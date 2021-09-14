import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import PropertiesListing from '../routes/Dashboards/Listing/PropertiesListing';

export default {
  title: 'Listing Properties Listing',
  component: PropertiesListing,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <PropertiesListing />;

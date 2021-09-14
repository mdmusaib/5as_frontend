import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import NewCustomers from '../routes/Dashboards/Crm/NewCustomers';

export default {
  title: 'Listing New Customers',
  component: NewCustomers,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <NewCustomers />;

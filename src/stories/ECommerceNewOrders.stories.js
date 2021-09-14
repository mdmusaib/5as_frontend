import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import NewOrders from '../routes/Dashboards/ECommerce/NewOrders';

export default {
  title: 'ECommerce NewOrders',
  component: NewOrders,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <NewOrders />;

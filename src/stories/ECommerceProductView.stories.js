import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import ProductView from '../routes/Dashboards/ECommerce/ProductView';

export default {
  title: 'ECommerce ProductView',
  component: ProductView,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <ProductView />;

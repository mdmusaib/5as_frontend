import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import PopularProducts from '../routes/Dashboards/ECommerce/PopularProducts';

export default {
  title: 'ECommerce PopularProducts',
  component: PopularProducts,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <PopularProducts />;

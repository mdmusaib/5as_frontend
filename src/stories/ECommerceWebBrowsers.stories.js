import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import WebBrowsers from '../routes/Dashboards/ECommerce/WebBrowsers';

export default {
  title: 'ECommerce WebBrowsers',
  component: WebBrowsers,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <WebBrowsers />;

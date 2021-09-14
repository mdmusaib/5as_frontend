import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import SiteTraffic from '../routes/Dashboards/News/SiteTraffic';

export default {
  title: 'News SiteTraffic',
  component: SiteTraffic,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <SiteTraffic />;

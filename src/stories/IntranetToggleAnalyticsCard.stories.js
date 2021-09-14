import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import ToggleAnalyticsCard from '../routes/Dashboards/Intranet/ToggleAnalyticsCard';
import VisitedToggleAnalyticsCard from '../routes/Dashboards/Intranet/ToggleAnalyticsCard/VisitedToggleAnalyticsCard';
import { intranet } from '../@fake-db';

export default {
  title: 'Intranet Toggle Analytics Card',
  component: ToggleAnalyticsCard,
  decorators: [withKnobs, withA11y],
};

export const Default = () => <ToggleAnalyticsCard data={intranet.monthlyTopChart} />;

export const AnnualCard = () => <ToggleAnalyticsCard data={intranet.annualTopChart} />;

export const VisitedToggleCard = () => <VisitedToggleAnalyticsCard />;

import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import OurOffice from '../routes/Dashboards/Intranet/OurOffice';
import { intranet } from '../@fake-db';

const ourOfficeData = intranet.ourOfficeData;

export default {
  title: 'Intranet OurOffice',
  component: OurOffice,
  decorators: [withKnobs, withA11y],
};

export const Default = () => (
  <OurOffice
    title={ourOfficeData.title}
    description={ourOfficeData.description}
    addresses={ourOfficeData.addresses}
    socialProfiles={ourOfficeData.socialProfiles}
  />
);

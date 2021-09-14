import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import ProjectWorkedHours from '../routes/Dashboards/Intranet/ProjectWorkedHours';

export default {
  title: 'Intranet ProjectWorkedHours',
  component: ProjectWorkedHours,
  decorators: [withKnobs, withA11y],
};

export const Default = () => <ProjectWorkedHours />;

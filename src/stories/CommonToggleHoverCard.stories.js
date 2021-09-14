import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import ToggleHoverCard from '../@jumbo/components/Common/ToggleHoverCard';
import InfoIcon from '@material-ui/icons/Info';

export default {
  title: 'Common Toggle Hover Card',
  component: ToggleHoverCard,
  decorators: [withKnobs, withA11y],
};

export const Default = () => (
  <ToggleHoverCard title="View" hoverAction="Monthly" toggleAction={<InfoIcon />}>
    <button>Buy Now</button>
  </ToggleHoverCard>
);

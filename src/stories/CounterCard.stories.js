import { text, withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import CounterCard from '../@jumbo/components/Common/CounterCard';

export default {
  title: 'CounterCard',
  component: CounterCard,
  decorators: [withKnobs, withA11y],
};

export const Default = () => (
  <CounterCard
    icon={text('Icon', '/images/dashboard/projectIcon.svg')}
    number={text('number', '09')}
    label={text('label', 'Projects')}
    backgroundColor={text('color', '#803BE2')}
  />
);

import React from 'react';
import EmailGraph from './EmailGraph';
import StatisticsClassicCard from '../../../../@jumbo/components/Common/StatisticsClassicCard';
import { useTheme } from '@material-ui/core/styles';

const TotalEmailSent = () => {
  const theme = useTheme();
  const labels = [
    { name: 'Sent', color: '#FFA800' },
    { name: 'Bounced', color: '#F3E5CF' },
  ];
  return (
    <StatisticsClassicCard
      backgroundColor={['#FFF2E2 -18.96%', '#fff 108.17%']}
      gradientDirection="180deg"
      color={'#FFA800'}
      title={'2,355'}
      subTitle={'Total Email Sent'}
      growth={1.5}
      labels={labels}>
      <EmailGraph />
    </StatisticsClassicCard>
  );
};

export default TotalEmailSent;

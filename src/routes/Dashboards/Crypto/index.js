import React from 'react';
import { Grid } from '@material-ui/core';
import BitcoinPurchaseHistory from './BitcoinPurchaseHistory';
import RipplePurchaseHistory from './RipplePurchaseHistory';
import EtheriumPurchaseHistory from './EtheriumPurchaseHistory';
import LitecoinPurchaseHistory from './LitecoinPurchaseHistory';
import PortfolioBalance from './PortfolioBalance';
import RevenueSummary from './RevenueSummary';
import RecentPayments from './RecentPayments';
import Calculator from './Calculator';
import CryptoNews from './CryptoNews';
import DownloadApps from '../../../@jumbo/components/Common/DownloadApps';
import OrderHistory from './OrderHistory';
import Box from '@material-ui/core/Box';
import InviteFriend from './InviteFriend';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';

const CryptoDashboard = () => {
  return (
    <PageContainer heading="Dashboard">
      <GridContainer>
        <Grid item xs={12} sm={6} md={3}>
          <BitcoinPurchaseHistory />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <RipplePurchaseHistory />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <EtheriumPurchaseHistory />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <LitecoinPurchaseHistory />
        </Grid>
        <Grid item xs={12} lg={6}>
          <PortfolioBalance />
        </Grid>
        <Grid item xs={12} lg={6}>
          <RevenueSummary />
        </Grid>
        <Grid item xs={12} xl={5}>
          <RecentPayments />
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <InviteFriend />
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <Calculator />
        </Grid>
        <Grid item xs={12} md={12} desktop={8} xl={8}>
          <CryptoNews />
        </Grid>
        <Grid item xs={12} md={12} desktop={4} xl={4}>
          <Box pb={6}>
            <DownloadApps />
          </Box>
          <OrderHistory />
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default CryptoDashboard;

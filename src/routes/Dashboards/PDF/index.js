import React, { useState } from 'react';
import { Grid, InputBase } from '@material-ui/core';
import BitcoinPurchaseHistory from '../Crypto/BitcoinPurchaseHistory';
import RipplePurchaseHistory from '../Crypto/RipplePurchaseHistory';
import EtheriumPurchaseHistory from '../Crypto/EtheriumPurchaseHistory';
import LitecoinPurchaseHistory from '../Crypto/LitecoinPurchaseHistory';
import PortfolioBalance from '../Crypto/PortfolioBalance';
import RevenueSummary from '../Crypto/RevenueSummary';
import RecentPayments from '../Crypto/RecentPayments';
import Calculator from '../Crypto/Calculator';
import CryptoNews from '../Crypto/CryptoNews';
// import DownloadApps from '../../../@jumbo/components/Common/DownloadApps';
import OrderHistory from './LeadsHistory';
import Box from '@material-ui/core/Box';
import InviteFriend from '../Crypto/InviteFriend';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import SearchBox from './LeadsHistory/search';
// src//SearchBox.js

const LeadsDashboard = () => {
  const [search, setsearch] = useState('');
  return (
    <PageContainer heading="Leads">
      <SearchBox
        placeholder={'Search by lead Id, contact name, phone number'}
        inputProps={{ 'aria-label': 'search' }}
        searchKeyword={search}
        onSearch={e => {
          setsearch(e.target.value);
        }}
      />
      <GridContainer>
        <Grid item xs={12} md={12} desktop={4} xl={4}>
          <OrderHistory search={search} />
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default LeadsDashboard;

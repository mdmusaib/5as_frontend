import React from 'react';
import { Grid } from '@material-ui/core';
import GridContainer from '../../@jumbo/components/GridContainer';
import CmtCard from '../../@coremat/CmtCard';
import CmtCardHeader from '../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../@coremat/CmtCard/CmtCardContent';
import Box from '@material-ui/core/Box'; 
import PageContainer from '../../@jumbo/components/PageComponents/layouts/PageContainer';
import PerfectScrollbar from 'react-perfect-scrollbar';
const breadcrumbs = [
  { label: 'Home', link: '/' },
  // { label: 'Dashboard', link: '/dashboard' },
  { label: 'Leads', isActive: true },
];

const NewsDashboard = () => {
  return (
    <PageContainer heading="All Leads" breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12} sm={12} xl={12}>
        <CmtCard className=''>
      <CmtCardHeader
        className="pt-4"
        title=""
        titleProps={{
          variant: 'h4',
          component: 'div',
        }}>
   
      </CmtCardHeader>
      <CmtCardContent>  
        <PerfectScrollbar>
        <h4> List Table Goes here  </h4>
        </PerfectScrollbar>
      </CmtCardContent>
    </CmtCard>
        </Grid>
         
      </GridContainer>
    </PageContainer>
  );
};

export default NewsDashboard;

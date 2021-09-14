import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';

const Dashboards = ({ match }) => {
  const requestedUrl = match.url.replace(/\/$/, '');
  const users = JSON.parse(localStorage.getItem("user"));

  if (users.role !== 7 || users.role !== 8 || users.role !== 9 || users.role !== 10) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Redirect exact from={`${requestedUrl}/`} to={`${requestedUrl}/leads`} />
          <Route path={`${requestedUrl}/crypto`} component={lazy(() => import('./Crypto'))} />
          {[1, 2, 3].find(f => f === users.role) && <Route path={`${requestedUrl}/leads`} component={lazy(() => import('./Leads'))} />}
          <Route path={`${requestedUrl}/dashboard`} component={lazy(() => import('./Leads/Dashboard'))} />
          {[1, 2, 3, 4, 5, 6].find(f => f === users.role) && <Route path={`${requestedUrl}/lead/create`} component={lazy(() => import('./Leads/CreateLead'))} />}
          <Route path={`${requestedUrl}/lead/:id`} component={lazy(() => import('./Leads/editLead'))} />
          <Route path={`${requestedUrl}/project/edit/:id`} component={lazy(() => import('./Projects/ViewProject'))} />
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].find(f => f === users.role) && <Route path={`${requestedUrl}/project/projectLeads`} component={lazy(() => import('./Projects/projectLeads'))} />}
          <Route path={`${requestedUrl}/PDF/create`} component={lazy(() => import('./PDF/CreatePDF'))} />
          <Route path={`${requestedUrl}/listing`} component={lazy(() => import('./Listing'))} />
          <Route path={`${requestedUrl}/intranet`} component={lazy(() => import('./Intranet'))} />
          <Route path={`${requestedUrl}/crm`} component={lazy(() => import('./Crm'))} />
          <Route path={`${requestedUrl}/news`} component={lazy(() => import('./News'))} />
          <Route path={`${requestedUrl}/eCommerce`} component={lazy(() => import('./ECommerce'))} />
          <Route path={`${requestedUrl}/misc`} component={lazy(() => import('./Misc'))} />
          <Route path={`${requestedUrl}/leads`} component={lazy(() => import('./Leads'))} />
          <Route path={`${requestedUrl}/calendar`} component={lazy(() => import('./Calendar'))} />
          {[1, 4, 5, 6, 7, 8, 9, 10].find(f => f === users.role) && <Route path={`${requestedUrl}/employee`} component={lazy(() => import('./Employee'))} />}
          {[1, 4, 5, 6, 7, 8, 9, 10].find(f => f === users.role) && <Route path={`${requestedUrl}/employeeManagement`} component={lazy(() => import('./EmployeeManagement'))} />}
          <Route path={`${requestedUrl}/taskCalendar`} component={lazy(() => import('./EventsCalendar'))} />
          <Route component={lazy(() => import('../ExtraPages/404'))} />
          {[7, 8, 9, 10].find(f => f === users.role) && <Route path={`${requestedUrl}/dashboard`} component={lazy(() => import('./Leads/Dashboard'))} />}
          {[7, 8, 9, 10].find(f => f === users.role) && <Route path={`${requestedUrl}/employee`} component={lazy(() => import('./Employee'))} />}
          {[7, 8, 9, 10].find(f => f === users.role) && <Route path={`${requestedUrl}/taskCalendar`} component={lazy(() => import('./EventsCalendar'))} />}
        </Switch>
      </Suspense>
    );
  }

};

export default Dashboards;

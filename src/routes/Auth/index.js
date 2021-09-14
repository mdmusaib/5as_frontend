import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';

const Auth = ({ match }) => {
  const requestedUrl = match.url.replace(/\/$/, '');
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Redirect exact from={`${requestedUrl}/`} to={`${requestedUrl}/login`} />
        <Route path={`${requestedUrl}/login`} component={lazy(() => import('./Login'))} />
        <Route path={`${requestedUrl}/signup`} component={lazy(() => import('./Register'))} />
        <Route component={lazy(() => import('../ExtraPages/404'))} />
      </Switch>
    </Suspense>
  );
};

export default Auth;

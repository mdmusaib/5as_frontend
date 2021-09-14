import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Dashboards from './Dashboards';
import Components from './Components';
import Apps from './Apps';
import Extensions from './Extensions';
import Charts from './Charts';
import Maps from './Maps';
import Widgets from './Widgets';
import Metrics from './Metrics';
import Login from './Auth/Login';
import Signup from './Auth/Register';
import CreateLead from './Leads';
import LeadsList from './Leads/List';
import ForgotPassword from './Auth/ForgotPassword';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ExtraPages from './ExtraPages';
import TourGuide from './TourGuide';
import Auth from './Auth';

const RestrictedRoute = ({ component: Component, ...rest }) => {
  const { authUser } = useSelector(({ auth }) => auth);
  return <Route {...rest} render={props => (authUser ? <Component {...props} /> : <Redirect to={'/signin'} />)} />;
};

const Routes = () => {
  const { authUser } = useSelector(({ auth }) => auth);
  const location = useLocation();
  if (location.pathname === '' || location.pathname === '/') {
    return <Redirect to={'/signin'} />;
  } else if (authUser && location.pathname === '/signin') {
    return <Redirect to={'/app'} />;
  }

  return (
    <React.Fragment>
      <Switch>
        <RestrictedRoute path="/app" component={Dashboards} />
        {/* <Route path="/auth" component={Auth} /> */}
        <Route path="/widgets" component={Widgets} />
        <Route path="/metrics" component={Metrics} />
        <Route path="/components" component={Components} />
        <Route path="/extensions" component={Extensions} />
        <Route path="/visualization/chart" component={Charts} />
        <Route path="/visualization/map" component={Maps} />
        <Route path="/extra-pages" component={ExtraPages} />
        <Route path="/apps" component={Apps} />
        <Route path="/signin" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgot-password" component={ForgotPassword} />
      </Switch>

      {location.pathname !== '/signin' && location.pathname !== '/signup' && location.pathname !== '/forgot-password' && (
        <TourGuide />
      )}
    </React.Fragment>
  );
};

export default Routes;

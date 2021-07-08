import React from 'react';
import {
  Router as Rr,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { browserHistory } from 'services/BrowserHistory';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { DashboardPage } from 'pages/DashboardPage/DashboardPage';
import { ROUTES } from 'constants/router';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const Router: React.FC = () => <Rr history={browserHistory}>
  <Switch>
    <Route path={ROUTES.ROOT} exact component={() => <Redirect to={ROUTES.DASHBOARD} />} />
    <PublicRoute path={ROUTES.LOGIN} component={LoginPage} />
    <PrivateRoute path={ROUTES.DASHBOARD} component={DashboardPage} />
    <Redirect to={ROUTES.DASHBOARD} />
  </Switch>
</Rr>;

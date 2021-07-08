import React from 'react';
import { useSelector } from 'react-redux';
import {
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';

import { PageSpiner } from 'components/PageSpiner';
import { userSelectors } from 'store/UserStore';
import { ROUTES } from 'constants/router';
import { NoConnection } from './NoConnection';

export type PrivateRouteProps = RouteProps & {
  component: React.ComponentType<any>;
};
export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const {
    component: Component,
    ...rest
  } = props;
  const hasConnection = useSelector(userSelectors.hasConnection);
  const user = useSelector(userSelectors.user);
  const userLoading = useSelector(userSelectors.userLoading);

  if (!hasConnection) {
    return <NoConnection />;
  }
  if (userLoading) {
    return <PageSpiner />;
  }

  return (
    <Route
      {...rest}
      render={props =>
        user
          ? <Component {...props} />
          : <Redirect
            to={{
              pathname: ROUTES.LOGIN,
              state: { from: props.location },
            }}
          />
      }
    />
  );
};

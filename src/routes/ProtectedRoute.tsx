import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export interface IProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  isAllowed: boolean;
  authenticationPath: string;
  restrictedPath: string;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = React.memo(function ProtectedRoute(
  props,
) {
  const { isAuthenticated, isAllowed, authenticationPath, restrictedPath } = props;
  let redirectPath = '';
  if (!isAuthenticated) {
    redirectPath = authenticationPath;
  }
  if (isAuthenticated && !isAllowed) {
    redirectPath = restrictedPath;
  }

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  }
  return <Route {...props} />;
});

export default ProtectedRoute;

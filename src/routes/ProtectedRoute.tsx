import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export interface IProtectedRouteProps extends RouteProps {
  checkState: () => boolean;
  isAllowed: boolean;
  authenticationPath: string;
  restrictedPath: string;
}

export const defaultProtectedRouteProps: IProtectedRouteProps = {
  checkState: () => localStorage.getItem('loginstate') === 'ok',
  isAllowed: true,
  authenticationPath: '/login',
  restrictedPath: '/login',
};

const ProtectedRoute: React.FC<IProtectedRouteProps> = React.memo(function ProtectedRoute(props) {
  const { checkState, isAllowed, authenticationPath, restrictedPath } = props;
  const isAuthenticated = checkState();
  let redirectPath = '';
  if (!isAuthenticated) {
    redirectPath = authenticationPath;
  }
  if (isAuthenticated && !isAllowed) {
    redirectPath = restrictedPath;
  }
  console.log(redirectPath);
  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  }
  return <Route {...props} />;
});

export default ProtectedRoute;

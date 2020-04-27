import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import ProtectedRoute, { defaultProtectedRouteProps } from './routes/ProtectedRoute';
import { ROUTES_REQUIRE_AUTH, AUTH_ROUTES, route2component } from './routes';

import AuthProvider from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {[...ROUTES_REQUIRE_AUTH].map((route) => (
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            path={route}
            component={route2component.get(route)}
            key={route}
          />
        ))}
        <AuthProvider>
          {[...AUTH_ROUTES].map((route) => (
            <Route path={route} component={route2component.get(route)} key={route} />
          ))}
        </AuthProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default hot(App);

import React from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import AuthProvider from './context/AuthContext';
import Login from './containers/Login';
import SignUp from './containers/SignUp';

function App() {
  // return <BrowserRouter></BrowserRouter>;
  return (
    <>
      <AuthProvider>
        <Login />
        <SignUp />
      </AuthProvider>
    </>
  );
}

export default hot(App);

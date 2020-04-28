import React from 'react';
import Auth from '../../components/Auth';

const Login: React.FC = React.memo(function Login() {
  return (
    <>
      <Auth title="Login" />
    </>
  );
});

export default Login;

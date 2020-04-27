import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import Auth from '../../components/Auth';

const Login: React.FC = React.memo(function Login() {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleLoginBtn = () => {
    localStorage.setItem('loginstate', 'ok');
    console.log('set');
    dispatch({
      type: 'CHANGE_AUTH_CTX',
      payload: {
        nickname: 'Yeoman',
        password: '23232',
        account: '188529',
      },
    });
    history.push('/msglist');
  };

  return (
    <>
      <Auth title="login" onBtnClick={handleLoginBtn} />
    </>
  );
});

export default Login;

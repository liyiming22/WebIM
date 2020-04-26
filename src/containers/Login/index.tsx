import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Login: React.FC = React.memo(function Login() {
  const { state, dispatch } = useContext(AuthContext);
  return (
    <>
      <button
        type="button"
        onClick={() => {
          console.log(state);
          dispatch({
            type: 'CHANGE_AUTH_CTX',
            payload: {
              nickname: 'Yeoman',
              password: '23232',
              account: '188529',
            },
          });
        }}
      >
        login
      </button>
    </>
  );
});

export default Login;

import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import Auth from '../../components/Auth';

const SignUp: React.FC = React.memo(function SignUp() {
  const { state, dispatch } = useContext(AuthContext);

  const handleSignUpBtn = () => {
    console.log(state);
    dispatch({
      type: 'CLEAR_ALL',
    });
  };

  return (
    <>
      <Auth title="sign up" onBtnClick={handleSignUpBtn} />
    </>
  );
});

export default SignUp;

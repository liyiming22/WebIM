import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const SignUp: React.FC = React.memo(function SignUp() {
  const { state, dispatch } = useContext(AuthContext);
  return (
    <>
      <button
        type="button"
        onClick={() => {
          console.log(state);
          dispatch({
            type: 'CLEAR_ALL',
          });
        }}
      >
        signup
      </button>
    </>
  );
});

export default SignUp;

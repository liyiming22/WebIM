import React, { createContext, useReducer } from 'react';

export interface IAuthCtx {
  nickname: string;
  account: string;
  password: string;
}

export const initAuthState: IAuthCtx = {
  nickname: '',
  account: '',
  password: '',
};

export type AuthCtxAction = { type: 'CHANGE_AUTH_CTX'; payload: IAuthCtx } | { type: 'CLEAR_ALL' };

export function authReducer(state: IAuthCtx = initAuthState, action: AuthCtxAction): IAuthCtx {
  switch (action.type) {
    case 'CHANGE_AUTH_CTX':
      return action.payload;
    case 'CLEAR_ALL':
      return initAuthState;
    default:
      return state;
  }
}

export const AuthContext = createContext<{
  state: IAuthCtx;
  dispatch: React.Dispatch<AuthCtxAction>;
}>({
  state: initAuthState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

const AuthCtxProvider: React.FC = React.memo(function AuthCtxProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initAuthState);
  return <AuthContext.Provider value={{ state, dispatch }}>{props.children}</AuthContext.Provider>;
});

export default AuthCtxProvider;

import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import LockOutlined from '@material-ui/icons/LockOutlined';

export type Title = 'sign up' | 'login';

export interface IAuthProps {
  title: Title;
  onBtnClick: () => void;
}

const Auth: React.FC<IAuthProps> = React.memo(function Auth({ title, onBtnClick }) {
  return (
    <>
      <LockOutlined />
      <hr />
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <form noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="account"
          label="Account"
          name="account"
          autoComplete="account"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
        />
        {title === 'sign up' && (
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="nickname"
            label="Nickname"
            id="nickname"
          />
        )}
        <Button fullWidth variant="contained" color="primary" onClick={onBtnClick}>
          {title.toUpperCase()}
        </Button>
      </form>
    </>
  );
});

export default Auth;

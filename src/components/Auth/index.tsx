/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useRef } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core';
// TODO: 图标暂时只能用这种方法加载
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Api from '../../utils/apis';
import { AuthContext, IAuthCtx } from '../../context/AuthContext';

export type Title = 'Sign up' | 'Login';

export interface IAuthProps {
  title: Title;
}

export type authCallback = () => void;
export type authHandler = (authState: IAuthCtx, cb?: authCallback) => void;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/YeomanLi/WebIM">
        Xingyu's Github
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// TODO: Override these two methods
const handleSignUp: authHandler = async (authState, cb) => {
  const { nickname, account, password } = authState;
  if (nickname !== '' && account !== '' && password !== '') {
    const res = await Api.registerUser({
      nickname,
      account,
      password,
    });
    res.data.code === 'Success' && cb && cb();
  }
};

const handleLogin: authHandler = async (authState, cb) => {
  const { account, password } = authState;
  if (account !== '' && password !== '') {
    const res = await Api.loginUser({
      account,
      password,
    });
    res.data.code === 'Success' && cb && cb();
  }
};

const Auth: React.FC<IAuthProps> = React.memo(function Auth({ title }) {
  const { state, dispatch } = useContext(AuthContext);
  const history = useHistory();
  const nicknameRef = useRef<HTMLInputElement>();
  const accountRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const { nickname, account, password } = state;
  const classes = useStyles();

  function dispatchAuthContext(): IAuthCtx {
    const payload = {
      account: accountRef.current?.value ?? '',
      password: passwordRef.current?.value ?? '',
      nickname: nicknameRef.current?.value ?? '',
    };
    dispatch({
      type: 'CHANGE_AUTH_CTX',
      payload,
    });
    return payload;
  }

  function onAuthBtnClick() {
    // 首先把当前页面填写的信息提交到 context，方便其他页面复用
    const authState = dispatchAuthContext();
    // 然后执行注册 or 登录函数逻辑
    title === 'Login' &&
      handleLogin(authState, () => {
        // 跳转到首页
        history.push('/msglist');
      });
    title === 'Sign up' && handleSignUp(authState);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <form className={classes.form} noValidate>
          {title === 'Sign up' && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nickname"
              label="Nickname"
              name="nickname"
              autoComplete="nickname"
              defaultValue={nickname}
              inputRef={nicknameRef}
            />
          )}
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
            defaultValue={account}
            inputRef={accountRef}
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
            autoComplete="current-password"
            defaultValue={password}
            inputRef={passwordRef}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onAuthBtnClick}
          >
            {title.toUpperCase()}
          </Button>
          <Grid container direction="row-reverse">
            <Grid item>
              {title === 'Login' ? (
                <Link component={RouterLink} to="/signup">
                  Don't have an account? Sign Up
                </Link>
              ) : (
                <Link component={RouterLink} to="/login">
                  Already have an account? Sign in
                </Link>
              )}
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
});

export default Auth;

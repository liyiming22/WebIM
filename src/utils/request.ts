import axios from 'axios';
import { store } from 'react-notifications-component';
import { getItem, setItem } from './localStorage';

const baseURL = 'http://127.0.0.1:9090/api';

const instance = axios.create({
  timeout: 6000,
  baseURL,
});

instance.interceptors.request.use(
  async (config) => {
    if (config.url && config.url.charAt(0) === '/') {
      config.url = `${baseURL}${config.url}`;
    }

    config.headers.authorization = `Bearer ${getItem('token')}`;

    return config;
  },
  // eslint-disable-next-line promise/no-promise-in-callback
  (error) => Promise.reject(error),
);

// 成功：2000，失败（无数据）：2001，未登录：2002，服务端错误：2003
// 登录成功：1000，登录失败（账号或密码错误）：1001，账号不存在：1002
// 用户已被注册:1003,注册失败:1004,注册成功:1005,用户验证过期：1006
// 验证码过期：1007
instance.interceptors.response.use(
  (response) => {
    // 登录成功，存储 token
    if (response.data.status === 1000) {
      setItem('token', response.data.data.token);
    }
    store.addNotification({
      title: response.data.code,
      message: response.data.msg,
      type: response.data.code.toLowerCase(),
      insert: 'top',
      container: 'top-center',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: {
        duration: 2000,
      },
    });
    return response;
  },
  (error) => {
    console.log('请求错误', error);
    store.addNotification({
      title: 'Error',
      message: '网络超时',
      type: 'warning',
      container: 'top-center',
      dismiss: {
        duration: 2000,
      },
    });
    return Promise.reject(error);
  },
);

export default instance;

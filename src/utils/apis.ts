import { AxiosResponse } from 'axios';
import request from './request';

export interface ILoginProps {
  account: string;
  password: string;
}

export interface IRegisterProps extends ILoginProps {
  nickname: string;
}

type codeType = 'Success' | 'Warning' | 'Danger';

export interface IResponse {
  status: number;
  code: codeType;
  msg: string;
  data: any;
}

const Api = {
  // 登录接口
  loginUser: (data: ILoginProps): Promise<AxiosResponse<IResponse>> =>
    request.post('/user/login', data),

  // 注册接口
  registerUser: (data: IRegisterProps): Promise<AxiosResponse<IResponse>> =>
    request.post('/user/signup', data),
};

export default Api;

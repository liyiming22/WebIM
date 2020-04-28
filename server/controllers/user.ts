/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import { pick } from 'lodash';
import jwt from 'jwt-simple';

import User from '../models/User';
import jwtConfig from '../config/passport';

const userController = {
  /**
   * POST /signup
   * Create a new local account
   */
  async postSignup(req: Request, res: Response) {
    try {
      const existingUser = await User.findOne({ account: req.body.account });
      if (existingUser) {
        res.json({
          status: 1003,
          code: 'Warning',
          msg: '该账号已被注册',
        });
      } else {
        const user = new User({
          account: req.body.account,
          password: req.body.password,
        });
        user
          .save()
          .then((savedUser) =>
            res.json({
              status: 1005,
              code: 'Success',
              msg: '注册成功',
              data: savedUser,
            }),
          )
          .catch((error) => {
            res.json({
              status: 2003,
              code: 'Warning',
              msg: 'server error...',
              error,
            });
          });
      }
    } catch (error) {
      res.json({
        status: 2003,
        code: 'Warning',
        msg: 'server error...',
        error,
      });
    }
  },

  /**
   * POST /login
   * Sign in using account and password
   */
  async postLogin(req: Request, res: Response) {
    const { account, password } = req.body;
    try {
      const user = await User.findOne({ account });
      if (!user) {
        res.json({
          status: 1002,
          code: 'Warning',
          msg: '账号不存在',
        });
        // TO DO: redirect to register page
      } else {
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            console.log(err);
          }
          if (isMatch) {
            const userInfo = pick(user, ['account', 'nickname', 'id']);
            res.json({
              status: 1000,
              code: 'Success',
              msg: '登录成功',
              data: {
                userInfo,
                token: jwt.encode(userInfo, jwtConfig.secret),
              },
            });
          } else {
            res.json({
              status: 1001,
              code: 'Warning',
              msg: '密码错误',
            });
          }
        });
      }
    } catch (error) {
      res.json({
        status: 2003,
        code: 'Warning',
        msg: 'server error...',
      });
    }
  },
};

export default userController;

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
        res.status(400).json({
          msg: 'error',
          data: '该账号已被注册',
        });
      } else {
        const user = new User({
          account: req.body.account,
          password: req.body.password,
        });
        user
          .save()
          .then((savedUser) =>
            res.status(200).json({
              msg: 'success',
              data: savedUser,
            }),
          )
          .catch((error) => {
            console.log(error);
            res.status(500).json({
              msg: 'error',
              data: 'server error...',
            });
          });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'error',
        data: 'server error...',
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
        res.status(404).json({
          msg: 'error',
          data: '账号不存在',
        });
        // TO DO: redirect to register page
      } else {
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            console.log(err);
          }
          if (isMatch) {
            const userInfo = pick(user, ['account', 'nickname', 'id']);
            res.status(200).json({
              msg: 'success',
              data: {
                userInfo,
                token: jwt.encode(userInfo, jwtConfig.secret),
              },
            });
          } else {
            res.status(401).json({
              msg: 'error',
              data: '密码错误',
            });
          }
        });
      }
    } catch (error) {
      res.status(500).json({
        msg: 'error',
        data: 'server error...',
      });
    }
  },
};

export default userController;

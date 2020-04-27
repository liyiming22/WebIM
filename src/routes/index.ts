/* eslint-disable import/prefer-default-export */
import loadable from '@loadable/component';

export const ROUTES_REQUIRE_AUTH = new Set([
  // '/group_chat/:group_id',
  // '/private_chat/:uid',
  '/profile/:uid',
  '/msglist',
  '/addresslist',
]);

export const AUTH_ROUTES = new Set(['/signup', '/login']);

export const route2component = new Map([
  ['/signup', loadable(() => import('../containers/SignUp'))],
  ['/login', loadable(() => import('../containers/Login'))],
  ['/profile/:uid', loadable(() => import('../containers/Profile'))],
  ['/msglist', loadable(() => import('../containers/MsgList'))],
  ['/addresslist', loadable(() => import('../containers/AddressList'))],
]);

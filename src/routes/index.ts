/* eslint-disable import/prefer-default-export */
export const ROUTE_REQUIRE_AUTH = new Set([
  '/group_chat/:group_id',
  '/private_chat/:uid',
  '/profile/:uid',
  '/msglist',
  '/addresslist',
]);

export const AUTH_ROUTE = new Set(['/signup', '/login']);

export const route2component = new Map([
  ['/signup', '@/containers/SignUp'],
  ['/login', '@/containers/Login'],
  ['/msglist', '@/containers/MsgList'],
  ['/addresslist', '@/containers/AddressList'],
  ['/group_chat/:group_id', '@/containers/GroupChat'],
  ['/private_chat/:uid', '@/containers/PrivateChat'],
  ['/profile/:uid', '@/containers/Profile'],
]);

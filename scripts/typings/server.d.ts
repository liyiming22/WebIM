import { Options } from 'http-proxy-middleware/dist/types';

export interface IProxyTable {
  [path: string]: Options;
}

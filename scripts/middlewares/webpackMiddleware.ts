import { Compiler } from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import devConfig from '../configs/webpack.dev';
import { HMR_PATH } from '../utils/constants';

export default function webpackMiddleware(compiler: Compiler) {
  const publicPath = devConfig.output!.publicPath!;

  const devMiddlewareOptions: webpackDevMiddleware.Options = {
    publicPath,
    stats: 'minimal',
  };

  const hotMiddlewareOptions: webpackHotMiddleware.MiddlewareOptions = {
    path: HMR_PATH,
    // overlay: true,
    // reload: true
  };

  return [
    webpackDevMiddleware(compiler, devMiddlewareOptions),
    webpackHotMiddleware(compiler, hotMiddlewareOptions),
  ];
}

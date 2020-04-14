import { Compiler } from 'webpack';
import { Express } from 'express';

// middlewares
import proxyMiddleware from './proxyMiddleware';
import historyFallback from 'connect-history-api-fallback';
import webpackMiddleware from './webpackMiddleware';

export default function setupMiddlewares (server: Express, compiler: Compiler) {
  proxyMiddleware(server);
  server.use(historyFallback());
  server.use(webpackMiddleware(compiler));
}
import chalk from 'chalk';
import logSymbols from 'log-symbols';
import webpack from 'webpack';
import express from 'express';

import devConfig from './configs/webpack.dev';
import getPort from './utils/getPort';
import setupMiddlewares from './middlewares';
import { HOST, DEFAULT_PORT } from './utils/constants';
import openBrowser from './utils/openBrowser';

async function start() {
  const PORT = await getPort(HOST, DEFAULT_PORT);
  const address = `http://${HOST}:${PORT}`;
  const devServer = express();
  const compiler = webpack(devConfig);
  setupMiddlewares(devServer, compiler);
  openBrowser(compiler, address);

  const httpServer = devServer.listen(PORT, HOST, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(
      `DevServer is running at ${chalk.magenta.underline(address)} ${logSymbols.success}`,
    );
  });

  ['SIGINT', 'SIGTERM'].forEach((signal: any) => {
    process.on(signal, () => {
      // 先关闭 devServer
      httpServer.close();
      // 在 ctrl + c 的时候随机输出 'See you again' 和 'Goodbye'
      console.log(
        chalk.greenBright.bold(`\n${Math.random() > 0.5 ? 'See you again' : 'Goodbye'}!`),
      );
      // 退出 node 进程
      process.exit();
    });
  });
}

// 判断这个模块是不是被直接运行的
if (require.main === module) {
  start();
}

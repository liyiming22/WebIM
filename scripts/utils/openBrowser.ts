import { argv } from 'yargs';
import open from 'open';
import { Compiler, Stats } from 'webpack';

export default function openBrowser(compiler: Compiler, address: string): void {
  const openArgument = argv.open;
  if (openArgument) {
    if (typeof openArgument === 'string') {
      address = openArgument;
    }
    let hadOpened = false;
    compiler.hooks.done.tap('open-browser-plugin', async (stats: Stats) => {
      if (!hadOpened && !stats.hasErrors()) {
        await open(address);
        hadOpened = true;
      }
    });
  }
}

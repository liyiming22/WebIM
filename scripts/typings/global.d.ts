declare module 'speed-measure-webpack-plugin' {
  import { Configuration, Plugin } from 'webpack';

  interface ISpeedMeasurePluginOptions {
    disable: boolean;
    outputFormat: 'json' | 'human' | 'humanVerbose' | ((outputObj: object) => void);
    outputTarget: string | ((outputObj: string) => void);
    pluginNames: object;
    granularLoaderData: boolean;
  }

  class SpeedMeasurePlugin extends Plugin {
    constructor(options?: Partial<ISpeedMeasurePluginOptions>);
    wrap(webpackConfig: Configuration): Configuration;
  }

  export = SpeedMeasurePlugin;
}

declare module 'size-plugin' {
  import { Plugin } from 'webpack';

  interface ISizePluginOptions {
    pattern: string;
    exclude: string;
    filename: string;
    publish: boolean;
    writeFile: boolean;
    stripHash: Function;
  }

  class SizePlugin extends Plugin {
    constructor(options?: Partial<ISizePluginOptions>);
  }

  export = SizePlugin;
}

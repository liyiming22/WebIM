import webpack from 'webpack';

import prodConfig from './configs/webpack.prod';
import { ENABLE_ANALYZE } from './utils/constants';

const compiler = webpack(prodConfig);

compiler.run((error, stats) => {
  if (error) {
    console.error(error);
    return;
  }

  const prodStatsOptions = {
    preset: 'normal',
    modules: ENABLE_ANALYZE,
    colors: true,
  };

  console.log(stats.toString(prodStatsOptions));
});

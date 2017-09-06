const webpack = require('webpack');

module.exports = config => {
  return {
    devServer: config.devServer,
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  }
};

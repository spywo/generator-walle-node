const webpack = require('webpack');

module.exports = config => {
  return {
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            extends: config.babelrcPath
          }
        }]
      },
      {
        test: /\.scss$/,
        use: ['sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }]
      }]
    },
    devtool: config.devtool
  }
};

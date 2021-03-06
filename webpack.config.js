const path = require('path');

module.exports = (env) => {
  return {
    mode: env.type,
    entry: './src/main.js',
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'public'),
    },
    devtool: 'source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      watchContentBase: true,
    }
  };
};

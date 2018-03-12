/* eslint "fp/no-mutation": ["error", {"commonjs": true}] */
const path = require('path');

const joinToDirname = pth => path.join(__dirname, pth);

module.exports = {
  cache: true,

  entry: {
    pnmg: joinToDirname('/src/index.js'),
  },
  output: {
    path: joinToDirname('/dist'),
    filename: '[name].js',
    library: 'library',
    libraryTarget: 'umd',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: JSON.stringify({
          presets: ['env', 'stage-0'],
        }),
      },
    ],
  },

  stats: {
    children: false,
  },
};

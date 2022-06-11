const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = Boolean(process.env.NODE_ENV === 'production')

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: [
    './src/index.ts'
  ],
  output: {
    path: __dirname + '/dist',
    filename: "app.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new ForkTsCheckerWebpackPlugin()
  ]
};

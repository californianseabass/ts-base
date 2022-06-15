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
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new ForkTsCheckerWebpackPlugin()
  ],
  devServer: {
    hot: !isProduction,
    port: 5000
  },
  devtool: 'inline-source-map'
};

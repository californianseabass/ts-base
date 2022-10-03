import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import fs from 'fs'

const isProduction = Boolean(process.env.NODE_ENV === 'production')

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const babelOptions = JSON.parse(fs.readFileSync('./babel.config.json'))

export default {
  context: __dirname,
  mode: isProduction ? 'production' : 'development',
  entry: ['./src/index.ts'],
  output: {
    path: __dirname + '/dist',
    clean: true,
    filename: "app.bundle.js"
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            ...babelOptions,
            ...(
                isProduction
                  ? {}
                  : { plugins: ['react-refresh/babel'] }
               )
          }
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
  ],
  devServer: {
    port: 5000
  },
  devtool: 'inline-source-map'
};

import path from 'path'
import { Configuration } from 'webpack'
import TerserPlugin from 'terser-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const config: Configuration = {
  mode: 'production',
  watchOptions: {
    ignored: /node_modules/,
  },
  entry: {
    main: './src/popup/index.tsx',
    background: './src/scripts/background/background.ts',
    content: './src/scripts/content/content.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: (data) => {
      const chunk = data.chunk?.name

      switch (chunk) {
        case 'main':
          return 'index.js'
        case 'background':
          return 'background.js'
        case 'content':
          return 'content.js'
        default:
          return '[name].[contenthash].js'
      }
    },
    clean: true,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][hash][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      publicPath: './',
      chunks: ['main'],
      filename: 'index.html',
      template: './public/index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './public/manifest.json',
          to: '.',
        },
      ],
    }),
  ],
}

export default config

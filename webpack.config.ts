import webpack from "webpack";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";

const config: webpack.Configuration = {
  mode: "production",
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  entry: {
    web: "./src/index.ts",
  },
  output: {
    path: path.resolve("dist"),
    filename: (pathData: webpack.PathData) => {
      return "[name].js";
    },
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.ProgressPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: ".",
          to: ".",
          context: "static",
        },
      ],
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};

export default config;

import webpack from "webpack";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const config: webpack.Configuration = {
  mode: "production",
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  entry: {
    main: "./src/index.ts",
    service_worker: "./src/service_worker.ts",
    content: "./src/content.ts",
    options: "./src/options/index.tsx",
    popup: "./src/popup/index.tsx",
  },
  output: {
    path: path.resolve("dist"),
    filename: (pathData: webpack.PathData) => {
      if (pathData.chunk?.name === "options") return "options/[name].js";
      else if (pathData.chunk?.name === "popup") return "popup/[name].js";
      return "[name].js";
    },
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
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
    new MiniCssExtractPlugin({
      filename: (pathData: webpack.PathData) => {
        if (pathData.chunk?.name === "options") return "options/[name].css";
        else if (pathData.chunk?.name === "popup") return "popup/[name].css";
        return "[name].css";
      },
    }),
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
    new HtmlWebpackPlugin({
      filename: "options/index.html",
      template: "./public/index.html",
      chunks: ["options"],
    }),
    new HtmlWebpackPlugin({
      filename: "popup/index.html",
      template: "./public/index.html",
      chunks: ["popup"],
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};

export default config;

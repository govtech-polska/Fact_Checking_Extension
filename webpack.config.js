const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtensionReloader = require("webpack-extension-reloader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const rootDir = path.join(__dirname, "./");
const version = JSON.stringify(require("./package.json").version);

module.exports = (env) => {
  return {
    entry: {
      main: "./src/index.js",
      background: "./src/background.js",
      content: "./src/content.js",
    },
    devtool: 'cheap-module-source-map',
    output: {
      filename: "[name].bundle.js",
      path: path.join(__dirname, "build"),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            "style-loader",
            "css-loader",
            "resolve-url-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
        {
          test: /\.(woff2?|ttf|otf|eot)$/,
          exclude: /node_modules/,
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          },
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: "./public/popup.html", to: "./popup.html" },
        { from: "./src/assets", to: "./assets" },
        {
          from: "./src/manifest.json",
          to: "./manifest.json",
          transform(manifest) {
            if (env.BROWSER === "firefox") {
              return manifest
                .toString()
                .replace("APP_PERMISSIONS", "<all_urls>")
                .replace(/"APP_VERSION"/, version);
            }
            if (env.BROWSER === "chrome") {
              return manifest
                .toString()
                .replace("APP_PERMISSIONS", "activeTab")
                .replace(/"APP_VERSION"/, version);
            }
            return manifest;
          },
        },
      ]),
      new Dotenv(),
      new CleanWebpackPlugin(),
    ],
  };
};

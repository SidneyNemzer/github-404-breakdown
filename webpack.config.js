const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const resolve = relativePath => path.resolve(__dirname, relativePath);

module.exports = (env, argv) => {
  return {
    entry: {
      "content-script": resolve("./src/content-script.js")
    },
    output: {
      path: resolve("./build"),
      filename: "github-404-breakdown.js"
    },

    module: {
      strictExportPresence: true,
      rules: [
        {
          oneOf: [
            {
              test: /\.js$/,
              loader: "babel-loader",
              options: {
                presets: [["@babel/preset-env", { targets: { chrome: "60" } }]]
              }
            },
            {
              test: /\.scss$/,
              use: [
                "style-loader",
                "css-loader",
                {
                  loader: "postcss-loader",
                  options: {
                    plugins: [require("postcss-prefixer")({ prefix: "g4b-" })]
                  }
                },
                "sass-loader"
              ]
            }
          ]
        }
      ]
    },

    plugins: [
      new CopyPlugin([
        resolve("./src/manifest.json"),
        resolve("./images/icon.png")
      ]),
      new CleanWebpackPlugin()
    ]
  };
};

const webpack = require("webpack");
const path = require("path");
const glob = require("glob-all");
const fs = require("fs");

// require webpack plugins
const VueLoaderPlugin = require("vue-loader/lib/plugin");

// get version
const packageJson = fs.readFileSync("./package.json");
const version = JSON.parse(packageJson).version || 0;

// extracts the css from vue and js files into a css file
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const TerserPlugin = require("terser-webpack-plugin");

// uncomment this to see the bundle analyzer
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const mode = process.env.NODE_ENV == "production" ? "production" : "development";
console.log("Build type: " + mode);

function getEntries(pattern) {
  const entries = {};
  glob.sync(pattern).forEach(file => {
    const ext = file.substr(file.lastIndexOf("."));
    const name = file.substr(file.lastIndexOf("/") + 1);
    const output = name.replace(ext, "");
    entries[output] = path.join(__dirname, file);
  });
  return entries;
}

const webpackJS = {
  mode: mode,
  resolve: {
    alias: {
      "@vue": path.resolve(__dirname, "src/vue"),
      "@root": path.resolve(__dirname)
    }
  },
  entry: getEntries("src/scripts/*.js"),
  output: {
    path: path.join(__dirname, "src/assets"),
    filename: "[name].js"
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        include: [path.resolve(__dirname, "src"), path.resolve(__dirname, "node_modules/vue-awesome")]
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              config: { path: path.resolve(__dirname, "postcss.config.js") }
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    /**
     * Uncomment this line to see the bundle analyzer
     */
    // new BundleAnalyzerPlugin(),

    /**
     * This plugin makes process.env.PACKAGE_VERSION available to your js files
     */
    new webpack.DefinePlugin({
      "process.env": {
        PACKAGE_VERSION: '"' + version + '"'
      }
    }),

    /**
     * The plugin is required!
     * It is responsible for cloning any other rules you have defined
     * and applying them to the corresponding language blocks in .vue files.
     * For example, if you have a rule matching /\.js$/, it will be applied to
     * <script> blocks in .vue files.
     */
    new VueLoaderPlugin(),

    /**
     * Extract css into a file
     */
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
};

module.exports = [{ ...webpackJS }];

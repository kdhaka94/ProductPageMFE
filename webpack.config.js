const HtmlWebPackPlugin = require("html-webpack-plugin");
const dotenv = require("dotenv");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require('dotenv-webpack');

dotenv.config()
const deps = require("./package.json").dependencies;
module.exports = (env) => ({
  output: {
    publicPath: "http://localhost:3004/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3004,
    historyApiFallback: true,
    open: false
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [new Dotenv(),

  new ModuleFederationPlugin({
    name: "ProductPageMFE",
    filename: "remoteEntry.js",
    remotes: {
      HomePageMFE: `HomePageMFE@${process.env.HomePageMFE}remoteEntry.js`,
      LoginPageMFE: `LoginPageMFE@${process.env.LoginPageMFE}remoteEntry.js`,
      CheckoutPageMFE: `CheckoutPageMFE@${process.env.CheckoutPageMFE}remoteEntry.js`,
    },
    exposes: {
      './SingleProductCard': './src/components/views/SingleProductCard/SingleProductCard.jsx',
      './RatingStars': './src/components/views/RatingStars/RatingStars.jsx',
    },
    shared: {
      ...deps,
      react: {
        singleton: true,
        requiredVersion: deps.react,
      },
      "react-dom": {
        singleton: true,
        requiredVersion: deps["react-dom"],
      },
    },
  }),
  new HtmlWebPackPlugin({
    template: "./src/index.html",
  }),
  ],
});

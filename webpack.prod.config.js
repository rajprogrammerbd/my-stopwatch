const config = require("./webpack.config");
const merge = require("webpack-merge");
const MiniCssWebpackPlugin = require("mini-css-extract-plugin");
const optimize = require('optimize-css-assets-webpack-plugin');
const Terser = require('terser-webpack-plugin');
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(config, {
    mode: "production",
    plugins: [new MiniCssWebpackPlugin({ filename: "[name].[contentHash].css" })],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssWebpackPlugin.loader, "css-loader"]
            },
            {
                test: /\.s[a|c]ss$/,
                use: [MiniCssWebpackPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    optimization: {
        minimizer: [
            new optimize(),
            new Terser(),
            new htmlWebpackPlugin({
                template: "./src/index.html",
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                }
            })
        ]
    }
});
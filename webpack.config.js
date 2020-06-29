const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: {
        main: "./src/index.js",
        animejs: "./src/anime.js",
    },
    output: {
        filename: "[name].[contentHash].js",
        path: path.resolve(__dirname, "public")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.html$/,
                use: "html-loader"
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[contentHash].[ext]"
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" }), new CleanWebpackPlugin()]
}
const config = require("./webpack.config");
const merge = require("webpack-merge");

module.exports = merge(config, {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.s[a|c]ss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    }
});
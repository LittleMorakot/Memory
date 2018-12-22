var path = require('path');

module.exports = {
    entry: './index.tsx',
    output: {
        filename: 'bundle.js', 
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: {
                loader: 'babel-loader',
                options: {
                        "presets": ["@babel/preset-env","@babel/preset-react"]
                    }
                }
            },
            {
                test: /\.(ts|tsx)?$/,
                loader: "ts-loader"
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader",
                }, {
                    loader: "css-loader",
                }, {
                    loader: "sass-loader",
                }]
            }
        ]
    },

    performance: {
        hints: false
    },

    devtool: 'cheap-module-inline-source-map',
}
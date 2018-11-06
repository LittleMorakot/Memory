module.exports = {
    entry: './index.tsx',
    output: {
        filename: 'bundle.js', 
        // path: ''
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                loader: 'babel-loader',
                options: {
                        "presets": ["@babel/preset-env","@babel/preset-react"]
                    }
                }
            },
            {
                test: /\.tsx?$/,
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
    }
}
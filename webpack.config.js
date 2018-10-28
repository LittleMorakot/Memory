module.exports = {
    entry: './index.jsx',
    output: {
        filename: 'bundle.js', 
        // path: ''
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
            }
        ]
    }
}
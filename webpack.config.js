const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'src/static/js')
    },

    module: {
        rules: [
            {
                test: /.(ts|tsx)?$/,
                loader: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
                exclude: [/node_modules/]
            }
        ]
    },

    devServer: {
        open: true,
        openPage: "index.html",
        contentBase: path.join(__dirname, "dist"),
        watchContentBase: true,
        port: 8080
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: ["node_modules"]
    }
};

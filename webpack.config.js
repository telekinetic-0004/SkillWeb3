const path = require('path');
const NodePolyfillPlugin = require("@webpack-contrib/node-polyfill-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: './api/linkedinAuth.js',
    resolve: {
        fallback: {
            "buffer": require.resolve("buffer/")
        }
    },   
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new NodePolyfillPlugin()
    ]
};

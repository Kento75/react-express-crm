const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: path.join(__dirname, '/client/src/app.jsx'),
    output: {
        path: path.join(__dirname, '/client/dist/js'),
        filename: 'app.js',
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            include: path.join(__dirname, '/client/src'),
            loader: 'babel-loader',
            options: {
                plugins: ["transform-class-properties"],
                presets: ["react", "es2015"]
            },
        }],
    },
    watch: true
};

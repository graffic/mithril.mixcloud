'use strict';

var path = require('path');
var BowerWebpackPlugin = require("bower-webpack-plugin");

module.exports = {
    entry: path.join(__dirname,'src','app.js'),
    resolve: {
        root: [path.join(__dirname, "bower_components")]
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'app.js'
    },
    plugins: [
        new BowerWebpackPlugin()
    ]
};

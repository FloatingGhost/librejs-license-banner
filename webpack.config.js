const webpack = require("webpack");
const path = require("path");
const APP_DIR = path.resolve("src");

module.exports = {

    mode: "production",

    entry: {
        main: APP_DIR + "/index.js"
    },

    output: {
        libraryTarget: "umd",
        globalObject: "this",
        filename: "license-banner.js"
    },

    module : {
        rules : [
            {
                test : /\.js/,
                include : APP_DIR,
                loader : "babel-loader"
            }
        ]
    },

    resolve: {
        extensions: [".js"],
        modules: [
            path.resolve("src"),
            path.resolve("node_modules")
        ],
    }
};


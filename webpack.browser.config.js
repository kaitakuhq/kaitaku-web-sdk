module.exports = {
    entry: "./src/lib/index.tsx",

    output: {
        path: `${__dirname}/build/browser`,
        filename: "main.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                // use: "ts-loader",
                loader: require.resolve('ts-loader'),
                options: {
                    configFile: 'tsconfig.browser.json'
                }
            },
            {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    }
};
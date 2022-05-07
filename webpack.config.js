
const pkg = require('./package.json')

const moduleUmd = {
    entry: "./src/lib/ModuleWrapper.tsx",

    output: {
        path: `${__dirname}/dist`,
        filename: "kaitaku.module.umd.js",
        libraryTarget: 'umd',
        library: 'kaitaku-web-sdk',
    },
    devtool: 'source-map',

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: require.resolve('ts-loader'),
                options: {
                    configFile: 'tsconfig.json'
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
            {
                test: /\.svg$/,
                use: {
                    loader: 'svg-url-loader'
                }
            }
        ]
    },
};

module.exports = [
    moduleUmd,
]
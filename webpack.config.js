const PATH = __dirname + '/build';
module.exports = {
    context: __dirname,
    entry: './src/index.es6',
    mode: 'none',
    output: {
        path: PATH,
        filename: 'bundle.js'
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.es6$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },
            {
                test: /\.png$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]'
                }
            },
            {
                test: /\.(mp3|ogg)$/,
                loader: 'file-loader',
                options: {
                    name: 'audio/[name].[ext]'
                }
            }
        ]
    }
};
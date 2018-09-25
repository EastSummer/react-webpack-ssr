const path = require('path')

module.exports = {
    target: 'node',
    entry: {
        app: path.join(__dirname, '../client/server-entry.js')
    },
    output: {
        filename: 'server-entry.js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/public',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /.jsx$/,
                loader: 'babel-loader'  // babel-loader为插件，还需要babel-core, babel-loader@7
            },
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: [
                    path.join(__dirname, '../node_modules')
                ]
            }
        ]
    }
}
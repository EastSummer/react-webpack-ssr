const axios = require('axios')
const path = require('path')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')   // 读写内存
const proxy = require('http-proxy-middleware')  // express中间件 用来做代理
const ReactDomServer = require('react-dom/server')

const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
    return new Promise((resolve, reject)=>{
        axios.get('http://localhost:8888/public/index.html')
            .then(res => {
                resolve(res.data)
            })
            .catch(reject)
    })
}

const Module = module.constructor   // module的构造方法

const mfs = new MemoryFs
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs   // 以前通过fs读写硬盘的文件，现在都通过mfs读写内存
let serverBundle;
serverCompiler.watch({}, (err, stats)=>{
    if(err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(warn => console.warn(warn))

    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    )
    const bundle = mfs.readFileSync(bundlePath, 'utf-8') // 取出来的是string
    const m = new Module()
    m._compile(bundle, 'server-entry.js')
    serverBundle = m.exports.default

})

module.exports = function(app) {

    app.use('/public', proxy({
        target: 'http://localhost:8888'
    }))

    app.get('*', function(req, res) {
        getTemplate().then(template => {
            const content = ReactDomServer.renderToString(serverBundle)
            res.send(template.replace('<!-- app -->', content))
        })
    })
}
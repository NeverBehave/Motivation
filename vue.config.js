const OfflinePlugin = require('offline-plugin')

let prod = (process.env.NODE_ENV === 'production')

let config = {
  configureWebpack: {
    plugins: []
  }
}

// Plugin
let Offline = new OfflinePlugin({
  // https://github.com/NekR/offline-plugin/blob/master/docs/examples/SPA.md
  // Unless specified in webpack's configuration itself
  publicPath: '/',
  appShell: '/',
  externals: [
    '/'
  ],
  responseStrategy: 'network-first',
  AppCache: {
    FALLBACK: {
      '/': '/error/cache-missed'
    }
  },
  excludes: ['**/.*', '**/_*', '**/*.map', '**/*.gz']
})

// Push Plugin Only in Prod
if (prod) {
  config.configureWebpack.plugins.push(Offline)
} else {
  console.log('Some plugins may not work as they are disabled when developing.')
}

module.exports = config

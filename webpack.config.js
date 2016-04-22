const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const TARGET = process.env.npm_lifecycle_event;


const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const common = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        // Test expects a RegExp! Notethe slashes!
        test: /\.css$/,
        loaders: ['style', 'css'],
        //Include accepts either a path or an array of paths
        include: PATHS.app
      }
    ]
  }
};

// Default configuration. We will return this if
// Webpack is called outside of npm.
if(TARGET === 'start' || !TARGET){
  module.exports = merge(common, {
    devServer: {
      contentBase: PATHS.build,

      //enable history API fallback so HTML5 HISTORY API based
      // routing works. This is a good default that will come in handy in more
      // complicated setups.
      historyAPIFallback: true,
      hot: true,
      inline: true,
      progress: true,

      //display only errors to reduce output amount
      stats: 'errors only',

      //Parse host and port from env so this is easy to customize
      host: process.env.HOST,
      port: process.env.PORT

},

plugins: [
  new webpack.HotModuleReplacementPlugin()
]
});
}

if(TARGET === 'build') {
  module.exports = merge(common, {});
}

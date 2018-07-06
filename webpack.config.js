import webpack from 'webpack';

module.exports = {
    // This creates a source map to make your
    // console errors a lot more developer friendly
    devtool: 'inline-source-map',
    // Webpack will start doing its thing here
    entry: {
        app: './app.js',
        vendor: ['angular']  
    },
    // Where Webpack spits the output
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
      // These are Webpack plugins (commonly referred
      // to as "loaders" in the Webpack community).
      // Babel will compile our ES6 to ES5
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    }
};
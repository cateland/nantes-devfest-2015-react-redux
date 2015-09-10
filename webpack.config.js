module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  resolve: ['','js','jsx'],
  module: {
    loaders: [{
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.js$/,
      loader: "babel",
      exclude: /node_modules/
    }, {
      test: /\.jsx$/,
      loader: "babel"
    }, {
      test: /\.woff$/,
      loader: "url-loader?limit=10000&minetype=application/font-woff"
    }, {
      test: /\.woff2$/,
      loader: "url-loader?limit=10000&minetype=application/font-woff"
    }, {
      test: /\.ttf$/,
      loader: "file-loader"
    }, {
      test: /\.eot$/,
      loader: "file-loader"
    }, {
      test: /\.svg$/,
      loader: "file-loader"
    }, {
      test: /bootstrap\/js\//,
      loader: 'imports?jQuery=jquery'
    }]
  }
};

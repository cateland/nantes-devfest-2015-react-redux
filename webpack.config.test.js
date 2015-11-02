module.exports = {
  entry: 'mocha!./test/index.js',
  output: {
    path: __dirname,
    filename: 'testBundle.js'
  },
  resolve: ['', 'js', 'jsx'],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: "babel",
      exclude: /node_modules/
    }, {
      test: /\.jsx$/,
      loader: "babel"
    }]
  }
}

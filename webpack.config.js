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
    }]
  }
};

var path = require('path');

module.exports = {
  entry: "./webpack/entry.js",
  output: {
    path: path.join(__dirname, "demo-build"),
    filename: "bundle.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['react', 'es2015']
        }
      },
      { test: /\.scss$/, loader: "style!css!sass" },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.json$/, loader: 'json'}
    ]
  }
};
var path = require('path');

module.exports.config = {
  mode: "production",
  entry: "./src/js/index.js",
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
    ],
  },
};


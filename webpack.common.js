const path = require('path');

module.exports = {
  entry: {
    app: './js/Priority.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/Priority.js',
  },
};

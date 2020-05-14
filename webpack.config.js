const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/easyUpload.js',
    output: {
        filename: 'easyUpload.js',
        path: path.resolve(__dirname, 'dist'),
    },
};

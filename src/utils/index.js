const path = require('path');
const fs = require('fs');

module.exports = {
    getFileName: function (filePath) {
        return path.basename(filePath);
    },

    getFileExtension: function (filePath) {
        return path.extname(filePath);
    },

    getFilePath: function (filePath) {
        return path.dirname(filePath);
    },

    getFileContent: function (filePath) {
        return fs.readFileSync(filePath, 'utf8');
    },
};
const path = require('path');
module.exports = projectInfo => {
    return {
        "main" : path.join(projectInfo.dirname, 'src',  projectInfo.entryFile || 'index.js')
    };
};
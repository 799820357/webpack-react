const path = require('path');
module.exports = projectInfo => {
    return  {
        extensions : ['.jsx', '.js', '.scss', '.css'],
        alias : {
            'dynamic-component' : path.join(projectInfo.dirname, 'common','dynamic-component')
        }
    }
};
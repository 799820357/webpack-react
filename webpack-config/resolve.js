const path = require('path');
module.exports = projectInfo => {
    return  {
        extensions : ['.jsx', '.js', '.scss', '.css'],
        alias : {
            'dynamic-component' : path.join(projectInfo.dirname, 'common','components','dynamic'),
            'use-promise' : path.join(projectInfo.dirname, 'common','hooks','promise')
        }
    }
};
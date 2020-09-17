const path = require('path');
module.exports = projectInfo => {
    let hooksPath = path.join(projectInfo.dirname, 'common','hooks');
    let componentPath = path.join(projectInfo.dirname, 'common','components');
    return  {
        extensions : ['.jsx', '.js', '.scss', '.css'],
        alias : {
            'dynamic-component' : path.join(componentPath,'dynamic'),
            'use-promise' : path.join(hooksPath,'promise'),
            'use-class-name' : path.join(hooksPath,'class-name'),
            'use-scroll-info' : path.join(hooksPath,'scroll-info'),
            'use-element-client-rect' : path.join(hooksPath,'element-client-rect')
        }
    }
};
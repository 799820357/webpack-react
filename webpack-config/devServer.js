module.exports = projectInfo => {
    let result = {
        open:true,
        port: projectInfo.port || '8080',
        hot: false,
        historyApiFallback: true,
        https: true,
        proxy: {
            '/widget':{
                target: 'http://news.baidu.com',
                secure: false,  //https 的时候 使用该参数
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/widget' : ''
                }
            }
        }
    };
    return result;
};
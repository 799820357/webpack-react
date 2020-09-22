import dataParseParams from './data-parse-params';
//初始化配置
const initSetting = {
    //默认请求方式
    type: 'GET',
    //数据类型
    dataType : 'json',
    //缓存
    cache : false,
    //参数
    data: null,
    //发送前的回调
    beforeSend: null,
    //上传进度回调
    progress: null,
    //发送成功的回调
    success: null,
    //发送失败的回调
    error: null,
    //发送完成的回调
    complete: null,
    //是否需要转化数据
    processData: true,
    //header-content-type
    contentType: '',
    //header-accepts
    accepts: {
        script: 'text/javascript, application/javascript',
        json:   'application/json',
        xml:    'application/xml, text/xml',
        html:   'text/html',
        text:   'text/plain'
    },
    //回调函数上下文（this指针）
    context: null,
    //是否尽行异步处理
    async: true,
    // 超时
    timeout: 0,
    //设置jsonp与服务端预定的callback的字段key
    jsonp : null,
    //设置jsonp与服务端预定的callback的字段值
    jsonpCallback : null
};
//ajax-error
let ajaxError = (res,xhr,context,error,complete,timer) => {
    //失败的回调
    typeof error == 'function' && error.call(context,res,xhr);
    //ajax完成
    ajaxComplete({
        type : 'error',
        message : res
    },xhr,context,complete,timer);
}
//ajax-success
let ajaxSuccess = (res,xhr,context,success,complete,timer) => {
    //成功的回调
    typeof success == 'function' && success.call(context,res,xhr);
    //ajax完成
    ajaxComplete({
        type : 'success',
        message : res
    },xhr,context,complete,timer);
}
//ajax-complete
let ajaxComplete = (res,xhr,context,complete,timer) => {
    typeof complete == 'function' && complete.call(context,res,xhr);
    //清理定时器
    if(timer){
        clearTimeout(timer);
        timer = null;
    }
}
//ajax
let ajax = options => {
    let {
        url, type, dataType, 
        context, timeout, beforeSend, 
        success, error, complete, progress,
        async, data, contentType, 
        accepts, cache, processData
    } = options;
    //xhr
    let xhr = new window.XMLHttpRequest();
    let timer = null;
    //是否跨域
    let crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(url) && RegExp.$2 != window.location.host;
    //type
    type = type.toLocaleUpperCase();
    //data-type
    dataType = dataType.toLocaleLowerCase()
    //判断缓存
    if(!cache){
        data = Object.assign(data || {},{
            '_' : parseInt((+ new Date) * Math.random())
        })
    }
    //转化参数
    if(processData){
        data = dataParseParams(data);
    }
    //get方式参数处理
    if(type == 'GET' && data && processData){
        if(/\?/.test(url)){
            url += /\?$/.test(url) ? data : '&' + data;
        }else{
            url += '?' + data;
        }
    }
    //开启请求
    xhr.open(type,url,async);
    //设置header
    {
        let header = {};
        if(!crossDomain){
            header['X-Requested-With'] = 'XMLHttpRequest';
        }
        //type
        if(contentType){
            header['Content-type'] = contentType;  
        } else if(type == 'POST' && contentType === ''){
            header['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';   
        }
        //data-type
        if(accepts[dataType]){
            header['Accept'] = accepts[dataType];   
        }
        //设置header
        Object.keys(header).forEach(key => {
            xhr.setRequestHeader(key,header[key]);
        })
    }
    //readystatechange
    // 协议
    let protocol = /^([\w-]+:)\/\//.test(url) ? RegExp.$1 : window.location.protocol;
    xhr.onreadystatechange = () => {
        if(xhr.readyState != 4){ return }
        //判断状态码
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
            try {
                let result = xhr.responseText;
                if (dataType == 'script') (1,eval)(result)
                else if (dataType == 'xml')  result = xhr.responseXML
                else if (dataType == 'json') result = /^\s*$/.test(result) ? null : JSON.parse(result);
                //成功回调
                ajaxSuccess(result, xhr, context, success, complete,timer);
            } catch (e) { 
                //失败回调
                ajaxError(e, xhr, context, error, complete,timer);
            }
        } else {
            //失败回调
            ajaxError(xhr.statusText || 'error', xhr, context, error, complete,timer);
        }
    }
    //改写abort
    let abort = xhr.abort;
    xhr.abort = (...arg) => {
        abort.apply(xhr,arg);
        ajaxError(arg[0] || 'abort', xhr, context, error, complete,timer);
    }
    //before-send
    typeof beforeSend == 'function' && beforeSend.call(context,xhr);
    //上传
    try{
        xhr.upload.onprogress = event => {
            typeof progress == 'function' && progress.call(context,event,xhr);
        };
    }catch(e){
        console.warn(e);
    }
    //发送
    xhr.send(data);
    //判断超时
    if(timeout > 0){
        timer = setTimeout(() => {
            xhr.onreadystatechange = () => {};
            xhr.abort('timeout');
        },timeout);
    }
    return xhr;
};
//jsonp
let ajaxJsonp = options => {
    let xhr = {
        abort : null
    };
    let timer = null;
    let { 
        url, jsonpCallback, jsonp, data, cache,
        context, error, beforeSend, success, complete, timeout
    } = options;
    jsonp = jsonp || 'callback';
    jsonpCallback = jsonpCallback || 'jsonpCallback' + parseInt((+ new Date) * Math.random());
    {
        data = Object.assign(data || {},{
            [jsonp] : jsonpCallback
        })
        if(!cache){
            data['_'] = parseInt((+ new Date) * Math.random())
        }
        data = dataParseParams(data);
        if(/\?/.test(url)){
            url += /\?$/.test(url) ? data : '&' + data;
        }else{
            url += '?' + data;
        }
    }
    let script = document.createElement('script');
    let body = document.getElementsByTagName('body')[0];
    //指定回调函数
    window[jsonpCallback] = res => {
        //清理回调函数
        delete window[jsonpCallback];
        //成功回调
        ajaxSuccess(res, xhr, context, success, complete,timer);
    }
    //设置src
    script.src = url;
    //拦截错误
    script.onerror = function() {
        xhr.abort('error');
    }
    //设置abort
    xhr.abort = (...arg) => {
        //更新回调函数-指向空
        window[jsonpCallback] = () => {
            delete window[jsonpCallback];
        }
        ajaxError(arg[0] || 'abort', xhr, context, error, complete, timer);
    }
    //before-send
    typeof beforeSend == 'function' && beforeSend.call(context,xhr);
    //插入-删除标签
    body.appendChild(script);
    body.removeChild(script);
    //判断超时
    if(timeout > 0){
        timer = setTimeout(() => {
            xhr.abort('timeout');
        },timeout);
    }
    return xhr;
}
//返回
export default options => {
    if(!options || !options.url){ 
        let {context,error, complete} = options;
        ajaxError('请设置request-url', null, context, error, complete, null);
        return
    }
    let setting = Object.assign(initSetting,options);
    let {dataType} = setting;
    return dataType.toLocaleLowerCase() == 'jsonp' ? ajaxJsonp(setting) : ajax(setting);
}
import {ajax} from 'utils';
import {useEffect,useState,useRef} from 'react';
export default (options,update = 0) => {
    //返回值
    let [promise,setPromise] = useState({
        then : () => {}
    });
    //xhr
    let xhr = useRef(null);
    //加载
    useEffect(() => {
        let error = options.error,
            success = options.success,
            complete = options.complete;
        //设置返回值
        setPromise(
            new Promise((resolve,reject) => {
                xhr.current = ajax(Object.assign(options,{
                    error : function(...args){
                        typeof error == 'function' && error.apply(this,args);
                        //回调
                        reject({
                            payload : args[0],
                            xhr : args[1]
                        });
                    },
                    success : function(...args){
                        typeof success == 'function' && success.apply(this,args);
                        //回调
                        resolve({
                            payload : args[0],
                            xhr : args[1]
                        });
                    },
                    complete : function(...args){
                        typeof complete == 'function' && complete.apply(this,args);
                    }
                }));
            })
        );
        return () => {
            if(!xhr.current){ return }
            xhr.current.abort();
        }
    },[update]);
    //卸载
    useEffect(() => {
        return () => {
            if(!xhr.current){ return }
            xhr.current.abort();
        }
    },[]);
    //返回
    return promise;
}
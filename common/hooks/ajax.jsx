import {ajax} from 'utils';
import {useEffect,useState,useRef} from 'react';
export default (options,update = 0) => {
    //返回值
    let [result,setResult] = useState({
        type : 'pending '
    });
    //xhr
    let xhr = useRef(null);
    //加载
    useEffect(() => {
        //设置返回值
        xhr.current = ajax(Object.assign(options,{
            beforeSend : () => {
                setResult({
                    type : 'pending'
                })
            },
            error : res => {
                setResult({
                    type : 'error',
                    payload : res
                })
            },
            success : res => {
                setResult({
                    type : 'success',
                    payload : res
                })
            }
        }));
        return () => {
            if(!xhr.current){ return }
            xhr.current.abort()
            xhr.current = null
        }
    },[update]);
    //卸载
    useEffect(() => {
        return () => {
            if(!xhr.current){ return }
            xhr.current.abort()
            xhr.current = null
        }
    },[]);
    //返回
    return result
}
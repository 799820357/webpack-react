import {useEffect,useRef,useState} from 'react';
export default promise => {
    let cancelRef = useRef(null);
    let [result,setResult] = useState({
        type : 'pending'
    });
    //加载
    useEffect(() => {
        let cancelPromise = new Promise((resolve,reject) => {
            cancelRef.current = reject
        })
        if(result.type != 'pending'){
            setResult({
                type : 'pending'
            })
        }
        Promise.race([promise,cancelPromise]).then(res => {
            setResult({
                type : 'success',
                payload : res
            })
            cancelRef.current = null
        },res => {
            setResult({
                type : 'error',
                payload : res
            })
            cancelRef.current = null
        })
        return () => {
            cancelRef.current && cancelRef.current('hooks-cancel')
        }
    },[promise]);
    //返回值
    return result;
}
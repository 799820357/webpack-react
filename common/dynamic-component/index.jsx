import React,{ useState, useEffect, useRef } from 'react';
//动态组件
export default promise => {
    //返回组件
    return props => {
        let [component,setComponent] = useState(null);
        let isMount = useRef(true);
        //初始化
        useEffect(() => {
            //加载异步组件
            promise.then(res => {
                if(!isMount.current){ return }
                let Component = res.default;
                //更新
                setComponent(<Component {...props}/>);
            },res => {
                if(!isMount.current){ return }
                console.warn('error:' + res);
            });
        },[props]);
        //卸载
        useEffect(() => {
            return () => {
                isMount.current = false;
            }
        },[]);
        //render
        return component;
    }
};

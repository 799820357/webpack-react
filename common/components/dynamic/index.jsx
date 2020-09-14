import React,{ useMemo } from 'react';
import usePromise from 'use-promise';
//动态组件
export default (promise,initProps) => {
    //返回组件
    return props => {
        let result = usePromise(promise);
        let component = useMemo(() => {
            if(!result){ return null }
            let Component = result.default;
            let nextProps = Object.assign({},initProps,props);
            return <Component {...nextProps}/>;
        },[result,props]);
        //render
        return component;
    }
};

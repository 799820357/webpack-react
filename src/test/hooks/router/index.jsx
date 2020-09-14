import dynamicComponent from 'dynamic-component';
import usePromise from 'use-promise';
import { Route, Redirect, withRouter} from 'react-router-dom';
import React,{useMemo,useRef} from 'react';

export default (promise,props) => {
    let result = usePromise(promise);
    let Page = useRef({});
    let component = useMemo(() => {
        if(!result){ return null }
        let defaultPage = null;
        //判断当前页面是否为需要页面
        if(Page.current.pathname != props.location.pathname){
            Page.current = null;
        }
        //遍历
        Object.keys(result.default).every(key => {
            let item = result.default[key];
            let pageKey = `/${key}`;
            //判断默认页面
            if(item.default){
                defaultPage = <Route path='/' exact render={ r => <Redirect to = {pageKey}/>}/>;
            };
            //判断当前页面
            if(!Page.current && props.location.pathname == pageKey){
                Page.current = {
                    pathname : props.location.pathname,
                    component : dynamicComponent(import(`../../pages/${item.path}`))
                }
            }
            //判断是否继续
            return !defaultPage || !Page.current;
        });
        return <>
            {defaultPage}
            {Page ? <Page.current.component {...props}/> : Page}
        </>
    },[result,props]);

    //render
    return component;
};
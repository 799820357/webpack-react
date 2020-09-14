import dynamicComponent from 'dynamic-component';
import usePromise from 'use-promise';
import { Route, Redirect, withRouter} from 'react-router-dom';
import React,{useMemo} from 'react';

export default (promise,props) => {
    let result = usePromise(promise);
    let component = useMemo(() => {
        if(!result){ return null }
        let defaultPage = null;
        let curPage = null;
        Object.keys(result.default).every(key => {
            let item = result.default[key];
            let pageKey = `/${key}`;
            //判断默认页面
            if(item.default){
                defaultPage = <Route path='/' exact render={ r => <Redirect to = {pageKey}/>}/>;
            };
            //判断当前页面
            if(props.location.pathname == pageKey){
                curPage = <Route 
                    key={key} 
                    exact = {true} 
                    strict = {true}
                    path = {'/' + key} 
                    component = { dynamicComponent(import(`../../pages/${item.path}`),props) }
                />;
            }
            //判断是否继续
            return !defaultPage || !curPage;
        });
        return <>
            {defaultPage}
            {curPage}
        </>
    },[result,props]);

    //render
    return component;
};
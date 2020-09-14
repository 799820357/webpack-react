import dynamicComponent from 'dynamic-component';
import usePromise from 'use-promise';
import { Route, Redirect, withRouter} from 'react-router-dom';
import React,{useMemo} from 'react';
export default (promise,props) => {
    let result = usePromise(promise);
    let component = useMemo(() => {
        if(!result){ return null }
        let defaultPage = null;
        let allPages = Object.keys(result.default).map(key => {
            let item = result.default[key];
            //判断默认页
            if(item.default){
                defaultPage = <Route path='/' exact render={ r => <Redirect to={'/' + key}/>}/>
            };
            return <Route 
                key={key} 
                exact = {true} 
                strict = {true}
                path = {'/' + key} 
                component = { dynamicComponent(import(`../../pages/${item.path}`),props) }
            />;
        });
        return <>
            {defaultPage}
            {allPages}
        </>
    },[result,props]);

    //render
    return component;
};
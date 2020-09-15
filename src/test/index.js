/**
 * IE11-报错
 * import 'core-js/es/promise';
 * import 'core-js/es/set';
 * import 'core-js/es/map';
*/

import './scss/index';
import React,{useState,useReducer, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import dynamicComponent from 'dynamic-component';
//layout-组件
const Layout = dynamicComponent(import('./components/layout'));
//全局context
import context from './contexts/global';
//全局reducer
import {reducer,initState} from './reducers/global';
//app
let App = props => {
    let [store,dispatch] = useReducer(reducer,props,initState);
    //render
    return <context.Provider value = {{
        store,dispatch
    }}>
        <HashRouter>
            <span onClick={() => setCount(count + 1)}>测试</span>
            <Layout/>
        </HashRouter>
    </context.Provider>   
};
//render
ReactDOM.render(
    <App/>,
    document.getElementById('page-container')
);
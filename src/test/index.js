/**
 * IE11-报错
 * import 'core-js/es/promise';
 * import 'core-js/es/set';
 * import 'core-js/es/map';
*/

import './scss/index';
import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import Layout from './components/layout';
//app
let App = () => {
    let [count,setCount] = useState(0);
    return <HashRouter>
        <span onClick={() => setCount(count + 1)}>测试</span>
        <Layout {...{count}}/>
    </HashRouter>;    
};
//render
ReactDOM.render(
    <App/>,
    document.getElementById('page-container')
);
/**
 * IE11报错
 * import 'core-js/es/promise';
 * import 'core-js/es/set';
 * import 'core-js/es/map';
*/

import './scss/index';
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Redirect} from 'react-router-dom';
import useRouter from './js/hooks/router';
//app
let App = () => {
    let routers = useRouter(import('./js/pages'));
    return <HashRouter>
        { routers }
    </HashRouter>;    
};
//render
ReactDOM.render(
    <App/>,
    document.getElementById('page-container')
);
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
import('./js/pages/home').then(res => {
    console.log(res)
});
import('./js/pages/detail').then(res => {
    console.log(res)
});
let App = () => {
    let handleClick = () => {
        import('./js/pages').then(res => {
            console.log(res)
        });
    };
    return <a onClick={handleClick}>点一下</a>
};
//render
ReactDOM.render(
    <App/>,
    document.getElementById('page-container')
);
import React,{useMemo} from 'react';
import {Link,withRouter} from 'react-router-dom';
import usePromise from 'use-promise';
import './index.scss';
export default props => {
    let routerMap = usePromise(import('../../pages'));
    let navList = useMemo(() => {
        if(!routerMap) { return null }
        return Object.keys(routerMap.default).map(key => {
            return <li  key = {key}>
                <Link to = {'/' + key}>{key}</Link>
            </li>
        });
    },[routerMap]);
    //render
    return <ul className="nav-panel">
        {navList}
    </ul>
}
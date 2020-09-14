import React,{useEffect, useMemo} from 'react';
import {Link,withRouter} from 'react-router-dom';
import usePromise from 'use-promise';
import './index.scss';
export default props => {
    console.log(props,'nav-component');
    let pages = usePromise(import('../../pages'));
    let navList = useMemo(() => {
        if(!pages) { return null }
        return Object.keys(pages.default).map(key => {
            return <li  key = {key}>
                <Link to = {'/' + key}>{key}</Link>
            </li>
        });
    },[pages]);
    //render
    return <ul className="nav-board">
        {navList}
    </ul>
}
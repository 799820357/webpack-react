import './index.scss';
import React from 'react';
import useRouter from '../../hooks/router';
export default props => {
    console.log(props,'page-component');
    //页面
    let pages = useRouter(import('../../pages'),props);
    //render
    return <div className="page-board">
        {pages}
    </div>;
}
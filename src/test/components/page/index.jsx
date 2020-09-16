import './index.scss';
import React from 'react';
import useRouter from '../../hooks/router';
const View = props => {
    //页面
    let pages = useRouter(import('../../pages'),props);
    //render
    return <div className="page-board">
        {pages}
    </div>;
};
export default View;